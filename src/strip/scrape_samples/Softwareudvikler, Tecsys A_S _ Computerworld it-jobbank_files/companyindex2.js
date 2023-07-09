/* eslint-env browser, jquery */
/* global jixAnalytics */
(function($) {
    "use strict";

    if (!window.JIX) { window.JIX = {}; }

    var followOptions;

    function updateFollowCompany($item, follow, remember, options) {
        var id = $item.data('companyid');
        if (follow) {
            $.ajax({
                url: options.add_url,
                method: 'POST',
                data: { 'companyid': id, 'remember': remember ? '1' : '0', csrf_token: options.csrf_token }
            })
                .done(function() {
                    $item.addClass('following');
                    $item.siblings('.follow_reject').addClass('d-none');
                    $item.trigger('companyFollowed.jix');
                    jixAnalytics('event', { category: 'Companyfollow', action: 'add', label: id });
                });
        } else {
            $.ajax({
                url: options.remove_url.replace(':id', id),
                method: 'POST',
                data: { csrf_token: options.csrf_token }
            })
                .done(function() {
                    $item.removeClass('following');
                    $item.siblings('.follow_reject').removeClass('d-none');
                    $item.trigger('companyUnfollowed.jix');
                });
        }
        if ($item.data().reload) {
            return window.location.reload();
        }
    }

    function rejectCompany($item, options) {
        $.ajax({
            url: options.reject_url.replace(':id', $item.data('companyid')),
            method: 'POST',
            data: { 'render': options.refresh_on_reject ? '1' : '0', csrf_token: options.csrf_token }
        })
            .done(function(data) {
                if (options.refresh_on_reject) {
                    var $new_list = $(data);
                    var $list = $item.closest('.jix-companyprofile-list');
                    // We can't replace list element without reattaching event listeners,
                    // so just replace content.
                    $list.empty();
                    $list.append($new_list.children());
                } else {
                    $item.closest('.card').remove();
                }
            });
    }

    function confirmFollow($item, data, callback) {
        if (!followOptions.confirm) {
            callback(true);
            return;
        }

        var $dialog = $('#jix_companyfollow_dialog');
        $dialog.one('click.jix', 'button.do_follow', function(_event) {
            $dialog.modal('hide');
            var remember = $dialog.find('input[name=remember]').is(':checked');
            followOptions.confirm = !remember;
            callback(remember);
        });
        $dialog.one('hide.bs.modal', function(_event) {
            $dialog.off('.jix');
            if ($item.data().reload) {
                return window.location.reload();
            }
        });
        show_explain($dialog, data.cvissues);
        $dialog.modal('show');
    }

    function show_explain($dialog, cvissues) {
        var explanation = ".explain-";
        if (cvissues === 'no_cv') {
            explanation += "nocv";
        } else if (cvissues === 'cv_not_online') {
            explanation += "offlinecv";
        } else if (cvissues === 'none') {
            explanation += "none";
        } else {
            explanation += "normal";
        }

        $dialog.find('.explain').toggle(false);
        $dialog.find(explanation).toggle(true);
    }


    function getJsonUrl(url) {
        return url.replace(/(\?|$)/, '.json$1');
    }

    function handleFollowCallback(res, args) {
        if (res.cancelled) {
            return;
        }
        var $item = args.item;
        var options = args.options;
        if (res.success) {
            $item.data('reload', true);
        }

        var infourl = options.add_url + '/' + $item.data('companyid') + '/userinfo';
        var params = {};
        $.get(
            getJsonUrl(infourl), params,
            function(data) {
                if (data.error !== undefined) {
                    console.error("An error occurred:", data.error);
                    return;
                }
                if (args.follow && !data.remember) {
                    confirmFollow($item, data, function(remember) {
                        options.confirm = options.confirm && !remember;
                        updateFollowCompany($item, args.follow, remember, options);
                    });
                } else {
                    updateFollowCompany($item, args.follow, false, options);
                }
            }
        );
    }

    JIX.setupCompanyProfileHandlers = function(options) {
        var defaults = {
            root: 'body main',
            item_selector: '.jix_companyindex_follow',
            confirm: false,
            refresh_on_reject: false
        };
        followOptions = options = $.extend(defaults, options);

        function followCallback(follow) {
            return function(e) {
                e.preventDefault();
                var $this = $(this);
                var $item = $this.closest(options.item_selector);
                window.JIX.Login.verify_login('user', handleFollowCallback, { clicked: $this, item: $item, follow: follow, options: options });
            };
        }

        $(options.root).on('click', '.follow_on', followCallback(true));
        $(options.root).on('click', '.follow_off', followCallback(false));
        $(options.root).on('click', '.follow_reject', function(event) {
            event.preventDefault();
            var $item = $(this).siblings(options.item_selector);
            rejectCompany($item, options);
            return false;
        });

    };

})(jQuery);
