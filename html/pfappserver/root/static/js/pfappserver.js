function getStatusMsg(a){var b;try{b=$.parseJSON(a.responseText).status_msg}catch(a){}return b||(b=_("Cannot Load Content")),b}function resetAlert(a){a.children(".alert").clearQueue().remove(),a.children(".error").removeClass("error")}function showAlert(a,b,c,d,e){void 0===e&&(e=5e3);var f=$(a).first().clone();f.find("span").first().text(c),b.before(f),d?f.fadeIn("fast"):f.fadeIn("fast").delay(e).slideUp("fast",function(){$(this).remove()})}function showWarning(a,b,c,d){showAlert(".alert-block",a,b,c,d)}function showPermanentWarning(a,b){showWarning(a,b,!0)}function showSuccess(a,b,c,d){showAlert(".alert-success",a,b,c,d)}function showPermanentSuccess(a,b){showSuccess(a,b,!0)}function showError(a,b,c,d){if(void 0===d&&(d=1e4),"string"==typeof b)showAlert(".alert-error",a,b,c,d);else{var e=a.closest("form");$.each(b,function(b,f){var g=e.find('[name="'+b+'"]'),h=g.closest(".control-group");h.addClass("error"),showTab(h,g),showCollapse(g),showAlert(".alert-error",a,f,c,d)})}}function showPermanentError(a,b){showError(a,b,!0)}function btnError(a){a.fadeOut("fast",function(a){$(this).addClass("btn-danger")}).fadeIn("fast").delay(5e3).queue(function(a){$(this).removeClass("btn-danger"),$(this).dequeue()})}function isFormInputEmpty(a){var b,c=a.closest(".control-group"),d=!1;return b="buttons-radio"==a.attr("data-toggle")?0===a.find(".active").length?null:1:a.val(),null===b||"string"==typeof b&&0===$.trim(b).length||0===b.length?(c.addClass("error"),d=!0,showTab(c,a)):c.removeClass("error"),d}function isInvalidNumber(a,b,c){var d=a.closest(".control-group"),e=!1;if(/^[0-9]+$/.test($.trim(a.val()))){var f=parseInt(a.val());(void 0!==b&&f<b||void 0!==c&&f>c)&&(e=!0)}else e=!0;return e?(d.addClass("error"),showTab(d,a)):d.removeClass("error"),e}function showCollapse(a){a.closest(".collapse").collapse("show")}function isFormValid(a){var b=!0;return a.find('input[data-required]:not(:disabled), input[type="number"]:not(:disabled)').each(function(){var a=$(this),c=a.closest(".control-group");return a.trigger("blur"),b=!c.hasClass("error"),b||showCollapse(a),b}),b}function showTab(a,b){var c=a.closest(".tab-pane");if(c){c.closest("form").find('.nav-tabs a[href="#'+c.attr("id")+'"]').tab("show")}}function _(a){var b=a;return labels[a]&&(b=labels[a]),b}function update_attribute(a,b,c,d){var e=a.attr(b);void 0!==e&&(e=e.replace(c,d),a.attr(b,e))}function update_attributes(a,b,c,d,e){update_attribute(a,b,d,e),a.find(c).each(function(){update_attribute($(this),b,d,e)})}function escapeRegExp(a){return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function dynamic_list_update_all_attributes(a,b,c){a.find(".sort-handle").first().text(c+1);var d=b+"\\.[0-9]+",e=new RegExp(d),f=b+"."+c.toString();update_attributes(a,"id",'[id*="'+b+'."]',e,f),update_attributes(a,"data-base-id",'[data-base-id*="'+b+'."]',e,f),update_attributes(a,"data-template-parent",'[data-template-parent*="'+b+'."]',e,f),update_attributes(a,"name",'[name^="'+b+'."]',e,f),update_attributes(a,"for",'[for^="'+b+'."]',e,f);var g=escapeJqueryId(b+"."),h=new RegExp(escapeRegExp(g)+"[0-9]+"),i=g+c.toString();$.each(["data-template-control-group","href","data-target-wrapper","data-target","data-template-parent","data-sortable-item"],function(b,c){var d="["+c+'*="'+escapeJqueryId(g)+'"]';update_attributes(a,c,d,h,i)})}function updateAction(a,b){var c=a.val();changeInputFromTemplate(a.next(),$("#"+c+"_action"),b)}function escapeJqueryId(a){return a.replace(/(:|\.|\[|\]|,|=|\\)/g,"\\$1")}function changeInputFromTemplate(a,b,c){var d=b.clone();d.removeAttr("id"),d.attr("id",a.attr("id")),d.attr("name",a.attr("name")),d.attr("data-required",1),c&&a.val()&&(d.attr("multiple")?d.val(a.val().split(",")):d.val(a.val())),d.insertBefore(a),a.next(".chzn-container").remove(),a.remove(),initWidgets(d)}function initWidgets(a){a.filter(".chzn-select").chosen(),a.filter(".chzn-deselect").chosen({allow_single_deselect:!0}),a.filter(".timepicker-default").each(function(){var a=!!$(this).val().length&&"value";$(this).timepicker({defaultTime:a,showSeconds:!1,showMeridian:!1})}),a.filter(".input-date, .input-daterange input").datepicker({autoclose:!0}),a.filter(".switch").bootstrapSwitch()}function submitFormHideModal(a,b){$.ajax({async:!1,url:b.attr("action"),type:b.attr("method")||"POST",data:b.serialize()}).always(function(){a.modal("hide")}).done(function(a){$(window).hashchange()}).fail(function(a){$("body,html").animate({scrollTop:0},"fast");var b=getStatusMsg(a);showError($("#section h2"),b)})}function activateNavLink(){var a=location.hash,b=!1,c=null;a&&"#"!=a&&(c=$(".sidenav .nav a").sort(function(a,b){return b.href.length-a.href.length}).filter(function(c,d){return!1===b&&0===a.indexOf(d.hash)&&(b=!0)})),null===c&&(c=$(".sidenav .nav a").first()),c.trigger("click")}function updateSection(a){return activateNavLink(),doUpdateSection(a)}function doUpdateSection(a){var b=$("#section");if(b){$("body,html").animate({scrollTop:0},"fast");var c=b.prev(".loader");c.show(),b.fadeTo("fast",.5,function(){$.ajax(a).always(function(){c.hide(),b.fadeTo("fast",1),resetAlert(b)}).done(function(a){b.html(a),b.find(".input-date, .input-daterange").datepicker({autoclose:!0}),b.find(".input-daterange input").on("changeDate",function(a){$(".datepicker").remove()}),b.find(".timepicker-default").each(function(){var a=!!$(this).val().length&&"value";$(this).timepicker({defaultTime:a,showSeconds:!1,showMeridian:!1})}),b.find(".chzn-select:visible").chosen(),b.find(".chzn-deselect:visible").chosen({allow_single_deselect:!0}),b.find(".switch").bootstrapSwitch(),"undefined"!=typeof Clipboard&&Clipboard.isSupported()?b.find(".clipboard .icon-clipboard").tooltip({title:_("Copy")}):b.find(".clipboard .icon-clipboard").remove(),b.trigger("section.loaded")}).fail(function(a){var c=getStatusMsg(a),d=b.children("h1, h2, h3").first().next();0===d.length&&(b.prepend("<h2></h2><div></div>"),d=b.children().first().next()),showPermanentError(d,c)})})}return!0}function updateSectionFromForm(a){updateSection({url:a.attr("action"),type:a.attr("method")||"POST",data:a.serialize()})}function pfOnHashChange(a,b){return function(c){var d=location.hash,e="/"+d.replace(/^#\/*/,"");return void 0===b||""!==e&&"/"!=e||(e=b),a(e,c)}}function updateDynamicRows(a){a.each(function(a,b){$(this).find(".sort-handle").first().text(a+1),$(this).find(':input, [data-toggle="buttons-radio"] > a').each(function(){var b=$(this),c=b.attr("name"),d=b.attr("id");c&&b.attr("name",c.replace(/\.[0-9]+/,"."+a)),d&&b.attr("id",d.replace(/\.[0-9]+/,"."+a)),"SELECT"==this.tagName&&$(this).find("option").each(function(){var b=$(this),c=b.attr("id");c&&b.attr("id",c.replace(/\.[0-9]+\./,"."+a+"."));var d=b.attr("name");d&&b.attr("name",d.replace(/\.[0-9]+\./,"."+a+"."))})})})}function updateDynamicRowsAfterRemove(a){var b=a.children("tbody"),c=b.children(":not(.hidden)");a.hasClass("table-sortable")&&(c=c.filter(":has(.sort-handle)")),updateDynamicRows(c);var d=c.length;if(d<2){var e="#"+a.attr("id")+"Empty";$(e).length?0===d&&(b.prev("thead").length&&"yes"!=b.attr("data-no-remove")&&a.remove(),$(e).removeClass("hidden")):1==d&&b.children(":not(.hidden)").find('[href="#delete"]').addClass("hidden")}}function bindExportCSV(){$(".exportCSVBtn").doOnce(".exportCSVBtn",function(){var a=this;$(a).click(function(){window.location=$(a).attr("data-export-url")+"?"+$($(a).attr("data-export-form")).serialize()+"&export=export"})})}function updateExtendedDurationExample(a){function b(a){return a<10?"0"+a:a}var c=$("#extendedFrom"),d=c.data("date"),e=c.html(),f=$("#extendedTo");if(!d){var g=new Date;e=g.getFullYear()+"-"+b(g.getMonth()+1)+"-"+b(g.getDate())+" "+b(g.getHours())+":"+b(g.getMinutes())+":"+b(g.getSeconds()),c.html(e),d=Math.floor(g.getTime()/1e3),c.data("date",d)}var h=a.find('[name$=".duration.interval"]').val(),i=a.find('input[name$=".duration.unit"]').val();if(h&&i){var j=h+i;if(a.find('[name$="day_base"]').is(":checked")){var k=a.find('[name$="period_base"]').is(":checked"),l={operator:a.find('[name$="operator"]').val(),interval:a.find('[name$="extended_duration.interval"]').val(),unit:a.find('input[name$="extended_duration.unit"]').val()};j+=k?"R":"F",l.operator&&l.interval&&l.unit?(j+="subtract"==l.operator?"-":"+",j+=l.interval+l.unit):j+="+0D"}a.data("duration",j),$.ajax(["/configuration","duration",d,j].join("/")).done(function(a){f.html(a.status_msg)})}else f.html(e)}function searchSwitchesGenerator(a){return function(b,c){$.ajax({url:"/config/switch/search",type:"POST",data:{json:1,all_or_any:"any","searches.0.name":"id","searches.0.op":"like","searches.0.value":b}}).done(function(a){var b=$.map(a.items,function(a){return a.id});c(b)}).fail(function(b){var c=getStatusMsg(b);showError(a,c)})}}function FingerbankSearch(){}$(function(){$("body").on({mouseenter:function(a){var b=$(this);b.text(b.attr("toggle-hover")),b.toggleClass("btn-success btn-danger")},mouseleave:function(a){var b=$(this);$.trim(b.text())==b.attr("toggle-hover")&&(b.text(b.attr("toggle-value-else")),b.toggleClass("btn-success btn-danger"))},toggle:function(a){var b=$(this),c=b.attr("toggle-value");b.fadeOut("fast",function(a){b.text(b.attr("toggle-value-else")),b.hasClass("btn-danger")&&b.removeClass("btn-danger")}).fadeIn("fast"),b.attr("toggle-value",b.attr("toggle-value-else")),b.attr("toggle-value-else",c),c=b.attr("toggle-hover"),b.attr("toggle-hover",b.attr("toggle-hover-else")),b.attr("toggle-hover-else",c),c=b.attr("toggle-href"),b.attr("toggle-href",b.attr("href")),b.attr("href",c)}},".btn-toggle"),$(".dropdown-toggle").dropdown(),$("body").on("click",".btn-group .btn",function(a){var b=$(this),c=b.attr("name"),d=b.siblings('input[name="'+c+'"]');d.val(b.attr("value")),d.trigger("change")}),$("body").on("click",".dropdown-menu-form",function(a){a.stopPropagation()}),$("body").on("blur","input[data-required]",function(){isFormInputEmpty($(this))}),$("body").on("changeDate",".input-date[data-required]",function(){isFormInputEmpty($(this))}),$("body").on("blur",'input[type="number"]',function(){var a=$(this),b=a.attr("min"),c=a.attr("max");$.trim(a.val()).length>0&&isInvalidNumber(a,b,c)})}),String.prototype.asCSSIdentifier=function(){return this.replace(/[^_a-zA-Z0-9]/g,"_")},jQuery.fn.extend({setBindId:function(){return this.each(function(){var a=this;if(!$(a).attr("data-do-bind-id")){var b=$("<a></a>").uniqueId().attr("id");$(a).attr("data-do-bind-id",b)}})},doOnce:function(a,b){return $.pfBindedEvents||($.pfBindedEvents={}),$.pfBindedEvents[a]||($.pfBindedEvents[a]={}),this.each(function(){var c=this;$(c).setBindId(),$.pfBindedEvents[a][$(c).attr("data-do-bind-id")]||($.pfBindedEvents[a][$(c).attr("data-do-bind-id")]=!0,$.proxy(b,this)())})}}),$(function(){function a(a){$(".sidenav-category .active").filter(function(b,c){$(c).attr("data-category")!=a&&$(c).removeClass("active")}),$('.sidenav-category [data-category="'+a+'"]').addClass("active"),$(".sidenav-fluid .sidenav-section").each(function(){var b=$(this);b.attr("data-category")==a?b.show():b.hide()}),$(".sidenav-fluid .sidenav-section .active").removeClass("active")}var b=function(a){a.getResponseHeader("Location")&&window.location.reload(!0)};if($.ajaxSetup({timeout:12e4,cache:!1,statusCode:{401:b,302:b}}),$(".sidenav-category a").click(function(b){return a($(this).parent().attr("data-category")),!0}),$(".sidenav-section a:not([data-toggle]):not([target])").click(function(b){var c=$(this).parent();return a(c.closest(".sidenav-section").attr("data-category")),c.hasClass("subsection")&&c.closest(".section").addClass("active"),c.addClass("active"),c.hasClass("section")&&0===c.find("ul").find("li.active").length&&$(c.find("ul").find("li")[0]).addClass("active"),!0}),$(".sidenav-category").on("mouseenter","[data-category]",function(a){var b=$(this),c=b.data("category"),d=b.hasClass("active");$(".sidenav-category-extend").addClass("show").find("li").each(function(){var a=$(this);d||a.data("category")!=c?a.removeClass("show"):a.addClass("show")})}),$(".sidenav-category").on("mouseleave mouseup","[data-category]",function(a){$(".sidenav-category-extend").removeClass("show").find("[data-category]").removeClass("show")}),$('#navbar [data-toggle="tooltip"]').tooltip({placement:"bottom"}),"undefined"!=typeof Clipboard&&Clipboard.isSupported()){new Clipboard(".icon-clipboard.btn-icon").on("success",function(a){var b=$(a.trigger);b.tooltip("destroy").tooltip({title:_("Copied")}).tooltip("show"),setTimeout(function(){b.tooltip("destroy").tooltip({title:_("Copy")})},3e3)})}$("body").on("click",'[data-toggle="dynamic-list"]',function(a){a.preventDefault();var b=$(this),c=$(b.attr("data-target")),d=$(b.attr("data-target-wrapper")),e=$(b.attr("data-template-parent")),f=$(b.attr("data-template-control-group")),g=b.attr("data-base-id"),h=e.clone();return h.removeAttr("id"),h.find(":input").each(function(a,b){var c=$(b);0===c.closest('[id^="dynamic-list-template"]').length&&(c.removeAttr("disabled"),c.removeClass("disabled"))}),dynamic_list_update_all_attributes(h,g,c.children().length),c.append(h.children()),c.children().last().trigger("dynamic-list.add"),d.removeClass("hidden"),f.addClass("hidden"),!1}),$("body").on("click",'[data-toggle="dynamic-list-delete"]',function(a){a.preventDefault();var b=$(this),c=$(b.attr("data-target-wrapper")),d=$(b.attr("data-target")),e=b.attr("data-base-id"),f=d.siblings(),g=$(b.attr("data-template-control-group"));return d.remove(),0===f.length?(c.addClass("hidden"),g.removeClass("hidden")):f.each(function(a,b){dynamic_list_update_all_attributes($(b),e,a)}),!1}),$("body").on("changeDate",'.input-daterange input[name="start"]',function(a){var b=$(this).parent().data("datepicker");$(b.inputs[1]).datepicker("setStartDate",a.date)}),$("body").on("changeDate",'.input-daterange input[name="end"]',function(a){var b=$(this).parent().data("datepicker");$(b.inputs[0]).datepicker("setEndDate",a.date)}),$("body").on("click",'.input-daterange a[href*="day"]',function(a){a.preventDefault();var b=$(this).attr("href").replace(/#last([0-9]+)days?/,"$1"),c=$(this).closest(".input-daterange").data("datepicker"),d=new Date,e={yyyy:d.getFullYear(),m:d.getMonth()+1,d:d.getDate()};e.dd=(e.d<10?"0":"")+e.d,e.mm=(e.m<10?"0":"")+e.m;var f=new Date(d.getTime()-24*b*60*60*1e3),g={yyyy:f.getFullYear(),m:f.getMonth()+1,d:f.getDate()};g.dd=(g.d<10?"0":"")+g.d,g.mm=(g.m<10?"0":"")+g.m;var h=c.pickers[0].element.attr("data-date-format"),i=h.replace("yyyy",g.yyyy).replace("mm",g.mm).replace("dd",g.dd);c.pickers[0].element.val(i),c.pickers[0].update(),c.pickers[0].setEndDate(f),c.pickers[0].element.trigger({type:"changeDate",date:c.pickers[0].date}),h=c.pickers[1].element.attr("data-date-format");var j=h.replace("yyyy",e.yyyy).replace("mm",e.mm).replace("dd",e.dd);return c.pickers[1].element.val(j),c.pickers[1].update(),c.pickers[1].setStartDate(d),c.pickers[1].element.trigger({type:"changeDate",date:c.pickers[1].date}),c.updateDates(),!1}),$("#section").on("admin.ordered",".admin_ordered",function(a){var b=$(this).closest("form");$.ajax({type:"POST",url:b.attr("action"),data:b.serialize()}).done(function(a){resetAlert($("#section")),showSuccess(b,a.status_msg)}).fail(function(a){var c=getStatusMsg(a);showPermanentError(b,c)})}),$("body").on("mousemove",".table-sortable tbody tr:not(.ui-draggable), .list-sortable li:not(.ui-draggable)",function(){var a=$(this),b=a.closest("table, ul").attr("id");a.draggable({scope:b,handle:".sort-handle",appendTo:"body",cursor:"move",helper:function(a){var b=[];if("TD"==a.target.tagName){$(a.target).closest("tr").first().find("td").each(function(){$(this).find('a[class!="btn-icon"], :selected, .uneditable').map(function(){$(this).hasClass("btn")||b.push($(this).text())}),$(this).find('input[type!="hidden"]:not(:checkbox)').map(function(){b.push($(this).val())})})}else{var c=$(a.target).closest("li").find("a").first().clone();c.find("span").remove(),b.push(c.text())}return $('<div class="drag-row">'+b.join(" ")+"</div>")}}),a.siblings().droppable({scope:b,accept:function(a){var b,c,d=0;if("TR"==a.context.tagName)b=a.context.rowIndex,c=this.rowIndex,d=c-b;else{var e=$(this).closest("ul").children();b=e.index(a),c=e.index(this),d=c-b}return d<0||d>1},hoverClass:"drop-row",drop:function(a,b){var c=b.draggable.detach(),d=$(this);c.insertBefore(d),updateDynamicRows(d.siblings(":not(.hidden)").addBack()),d.closest("table, ul").trigger("admin.ordered")}})}),$("body").on("mousemove",".dynamic-list-sortable .sort-handle:not(.ui-draggable)",function(){var a=$(this),b=a.attr("data-sortable-scope"),c=$(a.attr("data-sortable-item"));a.draggable({scope:b,handle:".sort-handle",appendTo:"body",cursor:"move",helper:function(a){return'<div class="drag-row">'+$(a.target).attr("data-sortable-text")+"</div>"}}),c.siblings().droppable({scope:b,accept:function(a){$(a.context).text();return $(a.context).text()!=$(this).find(".sort-handle:first").text()},hoverClass:"drop-dynamic-row",drop:function(a,b){var c=$(this),d=parseInt(c.find(".sort-handle:first").text(),10),e=b.draggable,f=$(e.attr("data-sortable-parent")),g=$(e.attr("data-sortable-item")),h=f.children().length,i=e.attr("data-base-id"),j=g.detach(),k=parseInt(j.find(".sort-handle:first").text(),10);console.log(k,d,h),d==h?f.append(j):k<d?j.insertAfter(c):j.insertBefore(c),f.children().each(function(a,b){dynamic_list_update_all_attributes($(b),i,a)})}})}),$("body").on("click",'.table-dynamic tbody [href="#add"]',function(a){return $(this).trigger("addrow"),!1}),$("body").on("addrow",".table-dynamic",function(a){var b=$(this),c=b.find(a.target).closest("tr"),d=b.children("tbody"),e=d.children(".hidden").first();if(e){var f=e.clone();f.removeClass("hidden"),f.find(":input").removeAttr("disabled"),f.find(".btn").removeClass("disabled"),c.length>0?f.insertAfter(c):f.insertBefore(e);var g=d.children(":not(.hidden)");b.hasClass("table-sortable")&&(g=g.filter(":has(.sort-handle)")),updateDynamicRows(g);if(g.length>=2){b=d.closest("table");var h="#"+b.attr("id")+"Empty";$(h).length&&$(h).addClass("hidden"),d.children(":not(.hidden)").find('[href="#delete"]').removeClass("hidden")}f.trigger("admin.added")}return!1}),$("body").on("click",'.table-dynamic [href="#delete"]',function(a){return $(this).trigger("deleterow"),!1}),$("body").on("deleterow",".table-dynamic",function(a){var b=$(this),c=b.find(a.target).closest("tr"),d=b.children("tbody");return c.fadeOut("fast",function(){$(this).remove(),updateDynamicRowsAfterRemove(b),d.trigger("admin.deleted")}),!1}),$("#section").on("click","a.updates_section_status_msg",function(){var a=$(this),b=a.attr("href"),c=a.data("sibling"),d=$("#section"),e=d.prev(".loader");c=c?a.closest(c):a.parent().next();var f=c.find('[data-toggle="dropdown"]');return e&&e.show(),d.fadeTo("fast",.5),$.ajax(b).always(function(){e&&e.hide(),d.stop(),d.fadeTo("fast",1)}).done(function(a){showPermanentSuccess(c,a.status_msg)}).fail(function(a){var b=getStatusMsg(a);404==a.status?showSuccess(c,b):showPermanentError(c,b)}),f.length&&f.dropdown("toggle"),!1}),$("#section").on("click",".call-modal-confirm-link",function(a){var b=$(this);if(b.hasClass("disabled"))return!1;var c=b.attr("href"),d=b.attr("data-target"),e=b.attr("data-content"),f=$(d);f.find("#content").html(e);var g=f.find("a.btn-primary").first();return f.modal({show:!0}),g.off("click"),g.attr("href",c),g.click(function(){f.modal("hide")}),!1}),$("#section").on("click",".call-modal-confirm-form",function(a){var b=$(this);if(b.hasClass("disabled"))return!1;var c,d=b.attr("data-modal"),e=b.attr("data-modal-form"),f=$("#"+d),g=b.attr("data-content"),h=f.find("a.btn-primary").first();return c=e?$("#"+e):b.closest("form"),g&&f.find("#content").html(g),isFormValid(c)&&(f.modal({show:!0}),h.off("click"),h.click(function(){return $.ajax({url:c.attr("action"),type:c.attr("method")||"POST",data:c.serialize()}).always(function(){f.modal("hide")}).done(function(a){a.status_msg?($("body,html").animate({scrollTop:0},"fast"),showSuccess($("h2").first().next(),a.status_msg)):$(window).hashchange()}).fail(function(a){$("body,html").animate({scrollTop:0},"fast");var b=getStatusMsg(a);showError($("#section h2"),b)}),!1})),!1}),$("#section").on("click",".call-modal",function(a){var b=$(this);if(b.hasClass("disabled"))return!1;var c=b.attr("href"),d=b.attr("data-modal"),e=b.attr("data-modal-content"),f=$("#"+d);e&&f.find("#content").html(e);var g=f.find("a.btn-primary").first();return f.modal({show:!0}),g.off("click"),g.click(function(){return $.ajax(c).always(function(){f.modal("hide")}).done(function(a){$(window).hashchange()}).fail(function(a){$("body,html").animate({scrollTop:0},"fast");var b=getStatusMsg(a);showError($("#section h2"),b)}),!1}),!1}),$("#section").on("click",'[data-toggle="modal"][data-target][data-href-background]',function(a){var b=$(this),c=b.attr("data-href-background"),d=$(b.attr("data-target")),e=d.find(".btn-primary").first();e.off("click"),e.click(function(){$.ajax(c).done(function(a){$(window).hashchange()}).fail(function(a){$("body,html").animate({scrollTop:0},"fast");var b=getStatusMsg(a);showError($("#section h2"),b)})})}),$("#section").on("click","#addExtendedTime",function(a){var b=$(this),c=b.closest(".extended-duration"),d=c.data("duration");if(d){var e=$(b.data("target")),f=e.val(),g=!1;$.each(f.split(/ *, */),function(a,b){if(b==d)return g=!0,!1}),g||e.val(f?f+","+d:d)}return!1}),$("body").on("section.loaded",function(a){updateExtendedDurationExample($(".extended-duration")),bindExportCSV(),FingerbankSearch.setup(),$(".pf-obfuscated-text + button").hover(function(a){var b=$(this);b.prev().attr("type","text"),b.find("i").removeClass("icon-eye").addClass("icon-eye-slash")},function(a){var b=$(this);b.prev().attr("type","password"),b.find("i").removeClass("icon-eye-slash").addClass("icon-eye")});var b=$(".sidenav-fluid .row-fluid").first();$("#section").find(".sidenav-section").each(function(){this.id&&b.find("#"+this.id).length>0?b.find("#"+this.id).show():$(this).detach().appendTo(b).show()})}),$("#section").on("change",".extended-duration",function(a){var b=$(a.target),c=b.closest(".extended-duration");if(b.is('[name$="day_base"]')){b.is(":checked")?c.find("[name*=extended_duration], [name$=period_base]").removeAttr("disabled").removeClass("disabled"):(c.find("input[name*=extended_duration], select[name*=extended_duration], input[name$=period_base]").attr("disabled","disabled"),c.find("a[name*=extended_duration]").addClass("disabled"))}updateExtendedDurationExample(c)}),"function"==typeof init&&init(),"function"==typeof initModals&&initModals(),$("#checkup_dropdown_toggle").click(function(){var a;$(this).closest("li").hasClass("open")&&$.get("/admin/checkup",function(b){var c=$("#checkup_dropdown");if(c.html(""),b.items.problems.length>0)for(var d in b.items.problems)a=$('<li class="disabled"><a href="#">'+b.items.problems[d].severity+" : "+b.items.problems[d].message+"</a></li>"),c.append(a);else a=$('<li class="disabled"><a href="#">No problem detected !</a></li>'),c.append(a)})}),$("#section").on("show",".modal",function(a){FingerbankSearch.setup()})}),FingerbankSearch.prototype.model_stripped=function(){return this.model.split("::Model::")[1].toLowerCase()},FingerbankSearch.prototype.search=function(a,b){var c=this,d=this.model_stripped();console.log(d),$.ajax({type:"POST",url:"/config/fingerbank/"+d+"/typeahead_search",headers:{Accept:"application/json"},data:{json:1,query:a,model:this.model},success:function(a){var d=$.map(a.items,function(a){return a.display});c.results=a.items;var e=c.typeahead_field,f=e.closest(".control-group");0===d.length?f.addClass("error"):f.removeClass("error"),b(d)}})},FingerbankSearch.setup=function(){$(".fingerbank-type-ahead").doOnce(".fingerbank-type-ahead",function(){var o=this;!function(){var search=new FingerbankSearch;search.typeahead_field=$(o),search.typeahead_field.attr("autocomplete","off"),search.typeahead_btn=$($(o).attr("data-btn")),search.model=$(o).attr("data-type-ahead-for"),search.add_to=$("#"+$(o).attr("data-add-to")),search.add_action=$(o).attr("data-add-action"),$(o).typeahead({source:$.proxy(search.search,search),minLength:2,items:11,matcher:function(a){return!0}}),search.typeahead_btn.click(function(e){e.preventDefault();var id,display;return console.log(search),$.each(search.results,function(){this.display==search.typeahead_field.val()&&(id=this.id,display=this.display)}),search.add_action?eval(search.add_action+"(search,id,display)"):void 0!==display&&(search.add_to.append('<option selected="selected" value="'+id+'">'+display+"</option>"),search.add_to.trigger("liszt:updated")),search.typeahead_field.val(""),!1})}()})};
//# sourceMappingURL=pfappserver.js.map