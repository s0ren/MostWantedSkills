/* eslint-env browser, jquery */
// Jobindex-specific sane defaults for select2
(function($) {
    "use strict";

    $.fn.jix_select2 = function (options) {
        if (!options) { options = {}; }

        var prefix_sort = !!options.prefix_sort;
        delete options.prefix_sort;

        if (options.tokenSeparators && !options.createTag) {
            throw new Error("tokenSeparators set without createTag option");
        }

        var select2_options = $.extend({
            width: "100%",
            dropdownCssClass: "bigdrop",
            containerCssClass: "form-control",
            //theme: "bootstrap",
            placeholder: $(this).attr('placeholder') ? $(this).attr('placeholder') : ""
        }, options);

        if (prefix_sort) {
            // Move every item with a matching prefix up in front of the list.
            // Based on http://stackoverflow.com/a/32106792/79061
            var query = {};

            if (select2_options.ajax) {
                var old_ajax_data = select2_options.ajax.data;
                select2_options.ajax.data = function (params) {
                    query = params;
                    return old_ajax_data ? old_ajax_data(params) : undefined;
                };
            } else {
                var old_matcher = select2_options.matcher;
                select2_options.matcher = function (data, params) {
                    query = params;
                    return old_matcher ? old_matcher(data, params) : data;
                };
            }

            var old_sorter = select2_options.sorter;
            select2_options.sorter = function (data) {
                var t = query.term.toLowerCase();
                var prefixed = [], others = [];
                $.each(data, function (i, v) {
                    if (v.text.toLowerCase().indexOf(t) === 0) {
                        prefixed.push(v);
                    } else {
                        others.push(v);
                    }
                });
                var new_data = prefixed.concat(others);
                return old_sorter ? old_sorter(new_data) : new_data;
            };
        }

        // Avoid duplicate showings of categories that appear multiple times in the select, for instance
        $(this).each(function () {
            var seen = {};
            $('option', this).each(function () {
                var $e = $(this);
                if (seen[$e.val()]) {
                    $e.removeProp('selected').removeAttr('selected');
                }
                if ($e.prop('selected')) {
                    seen[$e.val()] = true;
                }
            });
        });

        var element = this.select2(select2_options);

        // Google's developers have apparently decided that they know better
        // than others, so they have decided to ignore autocomplete="off" and
        // just autocomplete anyway. Apparently you can still trick it into
        // disabling autocompletion by selecting an attribute value that
        // doesn't exist in the WHATWG spec. This works because the browser
        // doesn't know that category, meaning that it doesn't have anything to
        // autocomplete. This particular value seems unlikely to ever be
        // included in the spec.
        $(".select2-search__field").attr('autocomplete', "chrome-autocomplete-sucks");

        // Ensure that clicking on the labels for the controls focuses select2.
        this.each(function(i, elm) {
            var $elm = $(elm);

            var $field = $elm.siblings('.select2-container').find('.select2-search__field');
            $field.attr('aria-label', $elm.attr('aria-label'));

            $elm.on('focus', function() {
                $elm.select2('open');
            });
        });

        // Workaround for bug #3373 : https://github.com/select2/select2/issues/3373
        // Dropdown doesn't follow bottom of input field if closeOnSelect is false.
        // Naughty naughty hack, uses an internal event from https://github.com/select2/select2/blob/e416e47356b2a92792e2c083a3d5ee9bdba5f908/src/js/select2/dropdown/attachBody.js#L77
        this.on("select2:select select2:unselect", function () { $(window).trigger('resize.select2.' + element.id); });

        this.on('change', function () {
            var $elem    = $(this),
                $select2 = $elem.siblings('.select2'),
                val      = $elem.val(),
                empty    = !val || val.length === 0;

            $select2.toggleClass('jix-select2-empty', empty)
                .toggleClass('jix-select2-not-empty', !empty);
        }).trigger('change');

        return element;
    };

    $(function () {
        // Make select2 work inside bootstrap modals: http://stackoverflow.com/a/19574076/79061
        if ($.fn.modal !== undefined) {
            $.fn.modal.Constructor.prototype._enforceFocus = function() {};
        }
    });
})(jQuery);
