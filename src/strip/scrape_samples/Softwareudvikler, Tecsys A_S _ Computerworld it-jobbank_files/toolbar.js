/* eslint-env browser, jquery */
/* global jixAnalytics */
$(function () {
    "use strict";
    if (!$.fn.popover) {
        throw new Error('Toolbar requires Bootstrap with popovers');
    }

    var actionMap = {
        'add-dialog': addRemoveJob,
        'remove-dialog': addRemoveJob,
        'applied': appliedJob,
        'notapplied': appliedJob,
        'opendialog': togglePopover,
        'toggle-share-dialog': toggleSharePopover,
        'handlecontact' : handleContact,
        'ignore': function() {}
    };

    function addContact($link, data) {
        if (data.show_confirmation || data.cvissues !== 'n') {
            allowContactDialog($link, data);
        } else {
            _changeContact($link, data);
        }
    }

    function confirmFollow(data, login) {
        var $dialog = $('#jix_companyfollow_dialog');
        $dialog.one('click.jix', 'button.do_follow', function(_event) {
            followCompany(data, login);
            $dialog.modal('hide');
        });
        $dialog.one('hide.bs.modal', function(_event) {
            $dialog.off('.jix');
            if (login) {
                return window.location.reload();
            }
        });
        var modalOptions = login ? { show: true, backdrop: 'static', keyboard: false } : { show: true };
        show_explain($dialog, 'dismiss');
        $dialog.modal(modalOptions);
    }

    function followCompany(data, login) {
        var url = data.mycompany_addurl;
        $.ajax({
            url: url,
            method: 'POST',
            data: { 'remember': 0, csrf_token: window.Stash.common.csrf_token }
        });
        var id = url.replace(/.*\?.*companyid=(\d+).*/, '$1');
        jixAnalytics('event', { category: 'Companyfollow', action: 'add', label: id });
        if (login) {
            return window.location.reload();
        }
    }

    function show_explain($dialog, cvissues) {
        var explanation = ".explain-";
        if (cvissues === 'no_cv') {
            explanation += "nocv";
        } else if (cvissues === 'cv_not_online') {
            explanation += "offlinecv";
        } else if (cvissues === 'none') {
            explanation += "none";
        } else if (cvissues === 'dismiss') {
            explanation += "dismiss";
        } else {
            explanation += "normal";
        }

        $dialog.find('.explain').toggle(false);
        $dialog.find(explanation).toggle(true);
    }

    function allowContactDialog($link, data) {
        var $dialog = $('#jix_allow_contact_dialog');
        var success = 0;

        $('button.do_allow_contact', $dialog).one('click', function() {
            var remember = $('input[name=remember]', $dialog);
            var params = { isNew: 'y', fromModal: true };
            if (remember.is(':checked')) {
                $.extend(params, { remember: 'y' });
            }
            if (data.login) {
                $.extend(params, { login: data.login });
            }

            success = 1;
            $dialog.modal('hide');
            return _changeContact($link, params);
        });
        $dialog.one('hide.bs.modal', function(_event) {
            if (data.login && !success) {
                return window.location.reload();
            }
        });

        var modalOptions = data.login ? { show: true, backdrop: 'static', keyboard: false } : { show: true };
        show_explain($dialog, data.cvissues);

        $.ajax({
            url: '/api/humanjob/v1/' + $link.data('tid') + '/interesttext',
            method: 'GET',
            data: { csrf_token: window.Stash.common.csrf_token }
        }).done(function(result){
            $dialog.find('#contact_dialog_company').text(result.interesttext);
            $dialog.modal(modalOptions);
        });

    }

    function handleContactCallback(res, args) {
        if (res.cancelled) {
            return;
        }
        var $link = args.link;
        var login = res.success;
        var url = $link.attr('href').replace(/\/[^/]*\/?$/, "/contactinfo");
        var params = {};
        $.get(
            getJsonUrl(url), params,
            function(data) {
                if (data.error !== undefined) {
                    console.error("An error occurred:", data.error);
                    return;
                }
                if (data.nouser) {
                    return window.location = $link.attr('href');
                }
                if (data.cvissues === 'y') { //remove
                    if (login) { // Expected behaviour is not to remove, when not logged in
                        return window.location.reload();
                    }
                    _changeContact($link, { login: login });
                } else {
                    if (login) {
                        $.extend(data, { login: login });
                    }
                    addContact($link, data);
                }
            }
        );
    }


    function handleContact($link) {
        JIX.Login.verify_login('user', handleContactCallback, { link: $link });
    }

    //    function needOnlineCVPopup(issue) {
    //        var $popup = $('#jix_need_online_cv_popup');
    //        $('.dependent', $popup).hide();
    //        $('.cv_popup_' + issue, $popup).show();
    //
    //        $('a', $popup).on('click', function() {
    //            $popup.modal('hide');
    //        });
    //
    //        $popup.modal('show');
    //    }

    function _changeContact($link, params) {
        params = params || {};
        params = Object.assign({ csrf_token: window.Stash.common.csrf_token }, params);
        var url = $link.attr('href');
        if (params.isNew === 'y') {
            var humanjob = url.replace(/.*\/(h\d+)\?.*/, '$1');
            jixAnalytics('event', { category: 'MyjobContact', action: 'add', label: humanjob });

            if ($link.closest('.jix_toolbar').find('.toolbar-myjob a').data('action') === 'add-dialog') {
                jixAnalytics('event', { category: 'Myjob', action: 'add', label: humanjob });
            }
        }

        $.post(
            getJsonUrl(url), params,
            function(data) {
                if (data.error !== undefined) {
                    console.error("An error occurred:", data.error);
                    if (data.error === 'login-required') {
                        return window.location = url;
                    } else {
                        var $elem = $link.closest('.toolbar-myjob').children('a');
                        if (params.login) {
                            return window.location.reload();
                        }
                        showPopover($elem, {}, true);
                    }
                    return;
                }
                updateToolbarAndTop(data.toolbar.default, $link.closest('.jix_toolbar'));
                if (data.mycompany_addurl !== '' && params.fromModal) {
                    return confirmFollow(data, params.login);
                }
                if (params.login) {
                    return window.location.reload();
                }
            }
        );
    }

    function handleClick(event) {
        var $link = $(event.target).closest('a');
        var action = $link.data('action');
        var method = actionMap[action];
        if (method) {
            event.preventDefault();
            method($link);
        }
    }

    function getJsonUrl(url) {
        url = url.replace(/(\?|$)/, '.json$1');
        if ($("#jix_toolbar_jobtext_sidebar").length) {
            url += url.match(/\.json$/) ? '?' : '&';
            url += "toolbar_variant=jobtext";
        }
        return url;
    }

    function showPopover($link, options, force) {
        options = options || {};
        $link.on('inserted.bs.popover', function () {
            var $popover = $("#" + $link.attr('aria-describedby'));
            var $links   = $("a", $popover);
            var $toolbar = $link.closest('.jix_toolbar');
            $links.on('click', handleClick);
            $links.data('toolbar', $toolbar);
        });
        if (force || !$link.data('popover-loaded')) {
            var url = $link.attr('href').replace(/\/[^/]*\/?$/, "/dialog");
            var params = {};
            $.extend(params, options.params);
            $.get(
                getJsonUrl(url), params,
                function(data) {
                    if (data.error !== undefined) {
                        console.error("An error occurred:", data.error);
                        return;
                    }
                    var $html = $(data.html);
                    var title = $html.find('.myjob-popover-title').html();
                    var content = $html.find('.myjob-popover-content').html();
                    var popover = $link.data('bs.popover');
                    if (popover && popover.config) {
                        popover.config.title = title;
                        popover.config.content = content;
                        popover.show();
                    } else {
                        $link.popover({
                            html: true,
                            placement: 'left',
                            title: title,
                            content: content,
                            trigger: 'manual',
                            sanitize: false
                        });
                        $link.popover('show');
                    }
                    $link.data('popover-loaded', 'true');
                }
            );
        } else {
            $link.popover('show');
        }
    }

    function togglePopover($link) {
        if ($link.siblings('.popover').length === 1) {
            $link.popover('hide');
        } else {
            showPopover($link, {}, true);
        }
    }

    function showSharePopover($link, options, force) {
        options = options || {};
        if (force || !$link.data('popover-loaded')) {
            var url = $link.data('share-popup-url') || $link.data('share-popup-url');
            var params = {};
            $.extend(params, options.params);
            $.get(
                getJsonUrl(url), params,
                function(data) {
                    if (data.error !== undefined) {
                        console.error("An error occurred:", data.error);
                        return;
                    }
                    var $html = $(data.html);
                    if (JIX.LinkedIn) {
                        JIX.LinkedIn.finishSetup($html);
                    }
                    if (JIX.ShareEmail) {
                        JIX.ShareEmail.finishSetup($html);
                    }
                    if (JIX.Link) {
                        JIX.Link.finishSetup($html);
                    }

                    $link.popover({
                        html: true,
                        placement: 'top',
                        content: $html,
                        trigger: 'manual'
                    });
                    $link.popover('show');
                    $link.data('popover-loaded', 'true');
                }
            );
        } else {
            $link.popover('show');
        }
    }

    function toggleSharePopover($link) {
        if ($link.siblings('.popover').length === 1) {
            $link.popover('hide');
        } else {
            showSharePopover($link);
        }
    }

    function addRemoveJob($link) {
        var url = $link.attr('href');
        var isAdd = $link.data('action') === 'add-dialog';
        $link.data('action', 'ignore'); // Prevent race-conditions
        $.post(
            getJsonUrl(url), { csrf_token: window.Stash.common.csrf_token },
            function(data) {
                if (data.error !== undefined) {
                    if (data.error === 'login-required') {
                        return window.location = url;
                    }
                    console.error("An error occurred:", data.error);
                    showPopover($link, {}, true);
                    return;
                }
                var $toolbar = $link.data('toolbar') || $link.closest('.jix_toolbar');
                var $myjob_toolbar = updateToolbarAndTop(data.toolbar.default, $toolbar);
                if (isAdd) {
                    var humanjob = url.replace(/.*\/(h\d+)\?.*/, '$1');
                    jixAnalytics('event', { category: 'Myjob', action: 'add', label: humanjob });
                    $link = $myjob_toolbar.children('a');
                    showPopover($link, { params: { message: 'add' } });
                }
            }
        );
    }

    function appliedJob($link) {
        var url = $link.attr('href');
        var hasApplied = $link.data('action') === 'applied';
        $link.data('action', 'ignore'); // Prevent race-conditions
        $.post(
            getJsonUrl(url), { csrf_token: window.Stash.common.csrf_token },
            function(data) {
                if (data.error !== undefined) {
                    console.error("An error occurred:", data.error);
                    if (data.error === 'login-required') {
                        return window.location = url;
                    } else {
                        var $elem = $link.closest('.toolbar-myjob').children('a');
                        showPopover($elem, {}, true);
                    }
                    return;
                }
                if (hasApplied) {
                    var humanjob = url.replace(/.*\/(h\d+)\?.*/, '$1');
                    jixAnalytics('event', { category: 'Myjob', action: 'applied', label: humanjob });
                }
                var $toolbar = $link.data('toolbar') || $link.closest('.jix_toolbar');
                updateToolbarAndTop(data.toolbar.default, $toolbar);
            }
        );
    }

    function updateToolbarAndTop(data, $toolbar) {
        var $jobtext_sidebar = $("#jix_toolbar_jobtext_sidebar");
        var $jobtext_bottom = $("#jix_toolbar_jobtext_bottom");
        if ($jobtext_sidebar.length || $jobtext_bottom.length) {
            $jobtext_sidebar.replaceWith(data.sidebar);
            $jobtext_bottom.replaceWith(data.bottom);

            return $('#jix_toolbar_jobtext_sidebar .toolbar-myjob');
        } else {
            var $data = $(data);
            var myjob_new = $data.filter('#' + $toolbar.attr('id')).find('.toolbar-myjob');
            var contact_new = $data.filter('#' + $toolbar.attr('id')).find('.toolbar-contact');

            var myjob = $toolbar.find('.toolbar-myjob');
            myjob.replaceWith(myjob_new);

            var contact = $toolbar.find('.toolbar-contact');
            contact.replaceWith(contact_new);

            return myjob_new;
        }
    }

    $(document).on('click', '.toolbar-myjob .popover .close', function() {
        $(this).closest('.toolbar-myjob').children('a').popover('hide');
    });

    $(document).on('click', '.toolbar-myjob a', handleClick);

    $(document).on('click', '.toolbar-contact a', handleClick);

    $(document).on('click', function(event) {
        var $target = $(event.target);
        if ($target.closest('.toolbar-myjob').length === 0) {
            $('.toolbar-myjob > a').each(function() {
                if ($(this).data('popover-loaded')) {
                    $(this).popover('hide');
                }
            });
        }
    });

    window.openMyjobPopover = function(tid, message) {
        var $link = $('#jix_toolbar_' + tid + ' .toolbar-myjob > a');
        if ($link.length) {
            showPopover($link, { 'params': { 'message': message } });
        }
    };

    var isProbablyMobile = navigator.userAgentData ? navigator.userAgentData.mobile : window.matchMedia('(max-width: 768px)').matches;
    if (isProbablyMobile && navigator.share) {
        $(document).on('click', '.toolbar-share a', function(event) {
            event.preventDefault();
            var $link = $(this);
            navigator.share({
                title: $link.data('share-title'),
                url: $link.data('share-url')
            });
        });
    } else {
        $(document).on('click', '.jix_toolbar_share a, .toolbar-share a', handleClick);

        $(document).on('click', function(event) {
            var $target = $(event.target);
            if ($target.closest('.jix_toolbar_share a, .toolbar-share > a').length === 0) {
                $('.jix_toolbar_share > a, .toolbar-share > a').each(function() {
                    if ($(this).data('popover-loaded')) {
                        $(this).popover('hide');
                    }
                });
            }
        });
    }

});
