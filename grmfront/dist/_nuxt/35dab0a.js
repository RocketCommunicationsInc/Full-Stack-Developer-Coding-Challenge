(window.webpackJsonp=window.webpackJsonp||[]).push([[10,5],{257:function(t,e,r){"use strict";r.r(e);r(261),r(256),r(409);var o={name:"AppLayout",data:function(){return{logoutshow:!0}},head:function(){return{bodyAttrs:{class:"dark-theme"}}},methods:{switchlight:function(){var body=document.body;"dark-theme"==body.classList?(body.classList.remove("dark-theme"),body.classList.toggle("light-theme"),body.style.backgroundColor="white"):(body.classList.remove("light-theme"),body.classList.toggle("dark-theme"),body.style.backgroundColor="#101923")},logout:function(){window.localStorage.clear(),window.location.href="./"}},mounted:function(){window.localStorage.getItem("authtoken")||(this.logoutshow=!1)}},n=r(52),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("rux-global-status-bar",[r("h1",{staticStyle:{color:"white"}},[r("rux-icon",{attrs:{color:"#fff",icon:"satellite-transmit"}}),t._v(" GRM Dashboard")],1),r("rux-clock"),r("div",{on:{click:t.switchlight}},[r("h1",{staticStyle:{color:"white"}},[r("b-icon-square-half")],1)]),t.logoutshow?r("div",{on:{click:t.logout}},[r("h1",{staticStyle:{color:"white"}},[r("b-icon-door-open")],1)]):t._e()],1),t._v(" "),t._t("default")],2)}),[],!1,null,null,null);e.default=component.exports},412:function(t,e,r){var content=r(417);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(53).default)("1b7833da",content,!0,{sourceMap:!1})},416:function(t,e,r){"use strict";r(412)},417:function(t,e,r){var o=r(51)(!1);o.push([t.i,"body{text-align:center}.rux-button{display:inline-block}",""]),t.exports=o},422:function(t,e,r){"use strict";r.r(e);r(15);var o=r(257),n=r(397);r(256);class l extends n.a{static get properties(){return{size:{type:String},icon:{type:String},iconOnly:{type:Boolean},disabled:{type:Boolean},outline:{type:Boolean}}}constructor(){super(),this.size="",this.icon="",this.iconOnly=!1,this.disabled=!1,this.outline=!1}render(){return n.c`
      <style>
        :host {
          display: inline-flex;
        }

        *[hidden] {
          display: none !important;
        }

        .rux-button-group {
          display: flex;
        }

        .rux-button-group rux-button:not(:last-child),
        .rux-button-group .rux-button:not(:last-child) {
          margin-right: 0.625rem;
        }

        /* Global Button Styles */
        .rux-button {
          display: flex;
          position: relative;

          margin: 0;
          padding: 0 1rem;

          height: 2.125rem;
          min-width: 2.25rem;
          /* max-width: 10.125rem; */

          border-radius: var(--buttonBorderRadius);

          color: var(--buttonTextColor);
          font-family: var(--fontFamily);
          font-size: 1rem;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          justify-content: center;
          align-items: center;

          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* 
          
          Disabled States
        
        */
        /* disabled state */
        .rux-button[disabled] {
          opacity: var(--disabledOpacity);
          cursor: var(--disabledCursor);
        }

        .rux-button[disabled]:focus {
          outline: none;
        }
        .rux-button:not(.rux-button--outline) {
          border: 1px solid var(--buttonBorderColor);
          background-color: var(--buttonBackgroundColor);
        }

        /* Outline Button Specific Styles */
        .rux-button--outline {
          color: var(--buttonOutlineTextColor);
          background-color: var(--buttonOutlineBackgroundColor);
          border: 1px solid var(--buttonOutlineBorderColor);
        }

        /* 
          
          Press/Active States
        
        */
        .rux-button:active:not([hover]):not([disabled]) {
          border-color: var(--buttonActiveBorderColor) !important;
          background-color: var(--buttonActiveBackgroundColor) !important;
        }
        
        .rux-button--outline:active:not([hover]):not([disabled]) {
          border-color: var(--buttonOutlineBorderColor) !important;
          background-color: var(--buttonOutlineBackgroundColor) !important;
        }


        /* 
          
          Hover States
        
        */
        .rux-button:hover:not([active]):not([disabled]):not(.rux-button--outline) {
          border-color: var(--buttonHoverBorderColor);
          background-color: var(--buttonHoverBackgroundColor);
				}

        .rux-button--outline:hover:not([disabled]) {
          color: var(--buttonOutlineHoverTextColor);
          background-color: var(--buttonOutlineHoverBackgroundColor);
          border-color: var(--buttonOutlineHoverBorderColor);
				}

				.rux-button:hover rux-icon {
					fill: var(--buttonHoverTextColor);
				}

				.rux-button--outline:hover rux-icon {
					fill: var(--buttonOutlineHoverTextColor);
				}
				.rux-button--outline:hover ::slotted(rux-icon){
					fill: var(--buttonOutlineHoverTextColor);
				}
				

        /* 
          
          Icons
        
        */

        .rux-button--small {
          font-size: var(--smallLabelTextSize);
          height: 1.625rem;
          padding: 0 1rem;
          line-height: 1;
        }

        .rux-button--large {
          font-size: var(--largeLabelTextSize);
          height: 2.875rem;
          min-width: 3rem;
          padding: 0 1rem;
        }

        ::slotted(rux-icon),
        rux-icon {
          height: 1.5rem;
          width: 1.5rem;

          margin-right: 0.625rem;
          margin-left: -0.625rem;
        }
        .rux-button--icon-only {
          font-size: 0;
        }
        .rux-button--icon-only ::slotted(rux-icon),
        .rux-button--icon-only rux-icon {
          margin-left: -0.625rem;
          margin-right: -0.625rem;
        }

        .rux-button--large.rux-button--icon-only ::slotted(rux-icon),
        .rux-button--large.rux-button--icon-only rux-icon {
          margin-left: -1rem;
          margin-right: -1rem;
        }
        .rux-button--small.rux-button--icon-only {
          min-width: 1.625rem;
          padding: 0 0.75rem;
        }

        .rux-button--small ::slotted(rux-icon),
        .rux-button--small rux-icon {
          height: 0.875rem;
          width: 0.875rem;
        }

        .rux-button--large ::slotted(rux-icon),
        .rux-button--large rux-icon {
          height: 1.75rem;
          width: 1.75rem;
          margin-left: -0.8rem;
          /* margin: -0.65rem 0.25rem -0.3rem calc((1.5rem - 0.625rem) * -1); */
				}
				
				.rux-button rux-icon {
					fill: var(--buttonTextColor);
				}

				.rux-button--outline rux-icon,
				.rux-button--outline rux-icon svg > use {
					fill: var(--buttonOutlineTextColor);
				}
				.rux-button ::slotted(rux-icon){
					fill: var(--buttonTextColor);
				}
				.rux-button--outline ::slotted(rux-icon){
					fill: var(--buttonOutlineTextColor);
				}

      </style>

      <button
        class="rux-button
          ${this.size?`rux-button--${this.size}`:""} 
          ${this.iconOnly?"rux-button--icon-only":""} 
          ${this.outline?"rux-button--outline":""}"
        ?disabled="${this.disabled}"
      >
        <rux-icon
          icon="${this.icon}"
          color="${this.outline?"var(--buttonOutlineTextColor)":"var(--buttonTextColor)"}"
          ?hidden="${!this.icon}"
        ></rux-icon>
        <slot></slot>
      </button>
    `}}customElements.define("rux-button",l);class c extends n.a{static get properties(){return{message:{type:String},status:{type:String},target:{type:String,reflect:!0},closeAfter:{type:Number},open:{type:Boolean,reflect:!0}}}constructor(){super(),this.message="",this.status="standby",this.target="local",this.closeAfter=null,this.open=!1}updated(){this._closeAfter&&this.open&&(this._closeAfter=setTimeout((()=>{this.open=!1}),this._closeAfter))}_onClick(){clearTimeout(this._closeAfter),this.open=!1}get _closeAfter(){return this.closeAfter&&this.closeAfter,(this.closeAfter&&this.closeAfter>1e4||this.closeAfter&&this.closeAfter<2e3)&&(this.closeAfter=2e3),this.closeAfter}render(){return n.c`
      <style>
        :host {
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          flex-grow: 1;
          align-items: center;
          align-content: center;

          top: -4.25rem;
          left: 0;

          height: 4.375rem;
          width: 100%;

          position: absolute;
          padding: 0 1.25rem;
          background-color: var(--colorStandbyLighten1);
          transition: top 0.5s ease;

					box-sizing: border-box;
					font-size: var(--fontSizeXL);
					color: var(--notificationTextColor);
        }
        :host([open]) {
          top: 0;
        }

        :host,
        :host([status='standby']) {
          background-color: var(--colorStandbyLighten1);
          stroke: var(--colorStandbyDarken1);
          fill: var(--colorStandbyDarken1);
        }

        :host([status='normal']) {
          background-color: var(--colorNormalLighten2);
          stroke: var(--colorNormalDarken1);
          fill: var(--colorNormalDarken1);
        }

        :host([status='caution']) {
          background-color: var(--colorCautionLighten1);
          stroke: var(--colorCautionDarken1);
          fill: var(--colorCautionDarken1);
        }

        :host([status='critical']) {
          background-color: var(--colorCriticalLighten1);
          stroke: var(--colorCriticalDarken1);
          fill: var(--colorCriticalDarken1);
        }
      </style>

      <div class="rux-notification__message">${this.message}</div>
      <rux-icon
        role="button"
        label="Close notification"
        @click="${this._onClick}"
        icon="close-large"
        size="small"
      ></rux-icon>
    `}}customElements.define("rux-notification",c);var d={name:"index",components:{AppLayout:o.default},data:function(){return{loginshow:!0,registershow:!1,loginerrorshow:!1,loginemail:"",loginpass:"",registeruserf:"",registeruserl:"",registeremail:"",registerpass:"",logoutshow:!1}},methods:{onLogin:function(){var t=this;event.preventDefault();try{var e={method:"POST",headers:{"Content-Type":"Application/json"},body:JSON.stringify({useremail:this.loginemail,userpass:this.loginpass})};fetch("/login",e).then((function(t){return t.json()})).then((function(data){return t.process(data)})).catch((function(e){return t.process(e)}))}catch(t){this.triggerloginerror()}},onRegister:function(){var t=this;event.preventDefault();try{var e={method:"POST",headers:{"Content-Type":"Application/json"},body:JSON.stringify({userfirst:this.registeruserf,userlast:this.registeruserl,useremail:this.registeremail,userpass:this.registerpass})};fetch("/adduser",e).then((function(t){return t.json()})).then((function(data){return t.processReg(data)})).catch((function(e){return t.processReg(e)}))}catch(t){this.triggerregistererror()}},triggerloginerror:function(){this.$refs.loginalert.setAttribute("open","true")},triggerregistererror:function(){this.$refs.registeralert.setAttribute("open","true")},process:function(data){if(console.log(data),data)return"success"==data.status?(window.localStorage.setItem("authtoken",data.message),window.location.href="/dashboard"):this.triggerloginerror(),data;this.triggerloginerror()},processReg:function(data){if(console.log(data),data)return"success"==data.status?(window.localStorage.setItem("authtoken",data.message),window.location.href="/dashboard"):this.triggerregistererror(),data;this.triggerregistererror()},switchRegister:function(){this.loginshow=!1,this.registershow=!0},switchLogin:function(){this.registershow=!1,this.loginshow=!0}}},h=(r(416),r(52)),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("AppLayout",[r("rux-notification",{ref:"loginalert",attrs:{message:"Login error. Please try again or register for this service."}}),t._v(" "),r("rux-notification",{ref:"registeralert",attrs:{message:"Registration error. Please verify that you have filled out all necessary information."}}),t._v(" "),r("b-container",{attrs:{fluid:""}},[r("b-row",[r("div",{staticStyle:{height:"15vh"}})]),t._v(" "),r("b-row",[r("b-col"),t._v(" "),r("b-col",[t.loginshow?r("div",[r("b-form",[r("h1",[t._v("Login")]),t._v(" "),r("div",{staticClass:"rux-form-field"},[r("label",{attrs:{for:"input__text1"}},[t._v("Email Address")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.loginemail,expression:"loginemail"}],staticClass:"rux-input",attrs:{id:"input__text1",type:"text",placeholder:"Enter email address"},domProps:{value:t.loginemail},on:{input:function(e){e.target.composing||(t.loginemail=e.target.value)}}})]),r("br"),r("br"),t._v(" "),r("div",{staticClass:"rux-form-field"},[r("label",{attrs:{for:"input__text2"}},[t._v("Password")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.loginpass,expression:"loginpass"}],staticClass:"rux-input",attrs:{id:"input__text2",type:"password",placeholder:"Enter password"},domProps:{value:t.loginpass},on:{input:function(e){e.target.composing||(t.loginpass=e.target.value)}}})]),r("br"),r("br"),t._v(" "),r("div",{staticStyle:{"border-radius":"3px","background-color":"rgba(40,63,88)",padding:"10px","text-align":"right"}},[r("rux-button",{attrs:{id:"abutton",size:"large",outline:""},on:{click:t.switchRegister}},[t._v("Register")]),r("div",{staticStyle:{display:"inline-block",width:"20px"}}),r("rux-button",{attrs:{size:"large"},on:{click:t.onLogin}},[t._v("Login")])],1),r("br"),r("br")])],1):t._e(),t._v(" "),t.registershow?r("div",[r("b-form",[r("h1",[t._v("Register")]),t._v(" "),r("div",{staticClass:"rux-form-field"},[r("label",{attrs:{for:"input__text3"}},[t._v("First Name")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.registeruserf,expression:"registeruserf"}],staticClass:"rux-input",attrs:{id:"input__text3",type:"text",placeholder:"Enter First Name"},domProps:{value:t.registeruserf},on:{input:function(e){e.target.composing||(t.registeruserf=e.target.value)}}})]),r("br"),r("br"),t._v(" "),r("div",{staticClass:"rux-form-field"},[r("label",{attrs:{for:"input__text4"}},[t._v("Last Name")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.registeruserl,expression:"registeruserl"}],staticClass:"rux-input",attrs:{id:"input__text4",type:"text",placeholder:"Enter Last Name"},domProps:{value:t.registeruserl},on:{input:function(e){e.target.composing||(t.registeruserl=e.target.value)}}})]),r("br"),r("br"),t._v(" "),r("div",{staticClass:"rux-form-field"},[r("label",{attrs:{for:"input__text5"}},[t._v("Email Address")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.registeremail,expression:"registeremail"}],staticClass:"rux-input",attrs:{id:"input__text5",type:"text",placeholder:"Enter email address"},domProps:{value:t.registeremail},on:{input:function(e){e.target.composing||(t.registeremail=e.target.value)}}})]),r("br"),r("br"),t._v(" "),r("div",{staticClass:"rux-form-field"},[r("label",{attrs:{for:"input__text5"}},[t._v("Create a Password")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.registerpass,expression:"registerpass"}],staticClass:"rux-input",attrs:{id:"input__text5",type:"password",placeholder:"Enter password"},domProps:{value:t.registerpass},on:{input:function(e){e.target.composing||(t.registerpass=e.target.value)}}})]),r("br"),r("br"),t._v(" "),r("div",{staticStyle:{"border-radius":"3px","background-color":"rgba(40,63,88)",padding:"10px","text-align":"right"}},[r("rux-button",{attrs:{id:"abutton",size:"large",outline:""},on:{click:t.switchLogin}},[t._v("Back to Login")]),r("div",{staticStyle:{display:"inline-block",width:"20px"}}),r("rux-button",{attrs:{size:"large"},on:{click:t.onRegister}},[t._v("Register")])],1),r("br"),r("br")])],1):t._e()]),t._v(" "),r("b-col")],1),t._v(" "),r("b-row")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AppLayout:r(257).default})}}]);