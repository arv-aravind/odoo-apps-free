/** @odoo-module **/
import core from 'web.core';
import rpc from 'web.rpc';
import SystrayMenu from 'web.SystrayMenu';
import Widget from 'web.Widget';
var qweb = core.qweb;

const SystrayWidget = Widget.extend({
    template: 'ArvStarredRecordsSystrayDropdown',
    events: {
        'click .o-dropdown': '_onClick',
        'click .arv-list-unstar': '_unStar',
        'dragstart .arv-dragable-star': '_onDrag',
        'dragend .arv-dragable-star': '_onDragEnd',
        'dragover .arv-star-drop': '_onDragOver',
        'drop .arv-star-drop': '_onDropStar',
    },

    init: function(parent, options) {
        this._super.apply(this, arguments); $(document).on('click', (event) => { if (!$(event.target).closest('.SystrayMenuContainer').length) { this.closeDropdown(); }; });
    },

    _onClick: function(ev) {
        this._check_data(); ev.stopPropagation(); var self = this; let dropBox = $(ev.currentTarget.parentElement).find('#star_systray_notif'); dropBox.toggle();
    },

    _unStar: function(ev){
        var key = '.'+ev.target.getAttribute('data-key'); var row_el = $(ev.target).closest('table'); rpc.query({ model: 'arv.starred.records', method: 'remove_records', args: [ev.target.getAttribute('data-key')] }).then(function(result) { row_el.fadeOut( "slow", function() { row_el.remove();}); });
    },

    _check_data: function(){
        var self = this; rpc.query({ model: 'arv.starred.records', method: 'get_records' }).then(function(result) { self.renderTemplate(result); });
    },

    _onDrag: function(ev){
        $('.arv-starred-icon').removeClass('fa-star').addClass('fa-star-o'); $('.arv-star-drop').css({'display':'block'}); $('.arv-starred-icon').css({'display':'block'});
    },

    _onDragOver: function (ev) {
    ev.preventDefault();
    },

    _onDropStar: function(ev){
        var self = this;
        ev.preventDefault();
        $('.arv-starred-icon').removeClass('fa-star-o').addClass('fa-star'); $( ".arv-starred-icon" ).fadeOut( "slow", function() { $('.arv-star-drop').css({'display':'none'}); });
        rpc.query({ model: 'arv.starred.records', method: 'add_records',args: [window.location.href] }).then(function(result) { if (result){ self.displayNotification({ type: 'success', title: 'Record Starred', message: result, sticky: false }); } else{ self.displayNotification({ type: 'warning', title: 'Starring Failed', message: 'You cannot star this record.', sticky: false }); } });
    },

    _onDragEnd: function(ev){
        ev.preventDefault();
        $( ".arv-starred-icon" ).fadeOut( "slow", function() { $('.arv-star-drop').css({'display':'none'}); })
    },

    renderTemplate: function(result) {
        try { var template = qweb.render('SystrayStarredRecordDetails', {records:result}); $('.systray_notification').html(template); } catch (error) { }
    },

    closeDropdown: function() {
        $('.o_MessagingMenu_dropdownMenu').hide();
     },
});
SystrayMenu.Items.push(SystrayWidget);
export default SystrayWidget;
