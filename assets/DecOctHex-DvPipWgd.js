import{o as d,c as p,d as i,i as s,j as n,p as u,k as m}from"./app-DNTRvR-x.js";import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";const h={data(){return{decimal:"",octal:"",hexadecimal:""}},methods:{onDecimalInput(){const t=parseInt(this.decimal,10);isNaN(t)?(this.octal="",this.hexadecimal=""):(this.octal=t.toString(8),this.hexadecimal=t.toString(16).toUpperCase())},onOctalInput(){const t=parseInt(this.octal,8);isNaN(t)?(this.decimal="",this.hexadecimal=""):(this.decimal=t.toString(10),this.hexadecimal=t.toString(16).toUpperCase())},onHexadecimalInput(){const t=parseInt(this.hexadecimal,16);isNaN(t)?(this.decimal="",this.octal=""):(this.decimal=t.toString(10),this.octal=t.toString(8))}}},c=t=>(u("data-v-60ba4ac7"),t=t(),m(),t),x={class:"container"},I={class:"input-group"},_=c(()=>i("label",{for:"decimal"},"十进制:",-1)),f={class:"input-group"},g=c(()=>i("label",{for:"octal"},"八进制:",-1)),v={class:"input-group"},S=c(()=>i("label",{for:"hexadecimal"},"十六进制:",-1));function N(t,e,V,D,l,o){return d(),p("div",x,[i("div",I,[_,s(i("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=a=>l.decimal=a),onInput:e[1]||(e[1]=(...a)=>o.onDecimalInput&&o.onDecimalInput(...a))},null,544),[[n,l.decimal]])]),i("div",f,[g,s(i("input",{type:"text","onUpdate:modelValue":e[2]||(e[2]=a=>l.octal=a),onInput:e[3]||(e[3]=(...a)=>o.onOctalInput&&o.onOctalInput(...a))},null,544),[[n,l.octal]])]),i("div",v,[S,s(i("input",{type:"text","onUpdate:modelValue":e[4]||(e[4]=a=>l.hexadecimal=a),onInput:e[5]||(e[5]=(...a)=>o.onHexadecimalInput&&o.onHexadecimalInput(...a))},null,544),[[n,l.hexadecimal]])])])}const O=r(h,[["render",N],["__scopeId","data-v-60ba4ac7"],["__file","DecOctHex.vue"]]);export{O as default};