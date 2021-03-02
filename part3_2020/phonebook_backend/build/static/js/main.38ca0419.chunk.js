(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(13),u=t.n(l),o=t(2),c=function(e){var n=e.addName,t=e.newName,a=e.handleNameChange,l=e.newNumber,u=e.handleNumberChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:l,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},i=function(e){var n=e.person,t=e.handleDeleteButton;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){return t(n)}},"delete"))},m=function(e){var n=e.filter,t=e.persons,a=e.handleDeleteButton;return r.a.createElement(r.a.Fragment,null,r.a.createElement("ul",null,t.filter((function(e){return e.name.slice(0,n.length).toLowerCase()===n.toLowerCase()})).map((function(e){return r.a.createElement("li",{key:e.name},e.name," ",e.number," ",r.a.createElement(i,{person:e,handleDeleteButton:a}))}))))},d=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t})))},f=t(3),s=t.n(f),h="/api/persons",b=function(){return s.a.get(h).then((function(e){return e.data}))},g=function(e){return s.a.post(h,e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return s.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.state;return null===n?null:r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:"s"===t?{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n))},w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],l=n[1],u=Object(a.useState)(""),i=Object(o.a)(u,2),f=i[0],s=i[1],h=Object(a.useState)(""),w=Object(o.a)(h,2),j=w[0],y=w[1],O=Object(a.useState)(""),C=Object(o.a)(O,2),k=C[0],N=C[1],S=Object(a.useState)(null),B=Object(o.a)(S,2),F=B[0],T=B[1],D=Object(a.useState)(null),A=Object(o.a)(D,2),P=A[0],R=A[1];return Object(a.useEffect)((function(){b().then((function(e){return l(e)}))}),[]),r.a.createElement("div",null,r.a.createElement(v,{message:F,state:P}),r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{filter:k,handleFilterChange:function(e){N(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(c,{addName:function(e){if(e.preventDefault(),!f)return T("Please specify a name."),R("e"),void setTimeout((function(){T(null),R(null)}),3e3);if(!j)return T("Please specify a number."),R("e"),void setTimeout((function(){T(null),R(null)}),3e3);var n={name:f,number:j};t.filter((function(e){return e.name===f})).length?window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))&&p(t.find((function(e){return e.name===f})).id,n).then((function(e){b().then((function(e){l(e),s(""),y(""),T("Altered number from ".concat(n.name)),R("s"),setTimeout((function(){T(null),R(null)}),3e3)}))})):g(n).then((function(e){b().then((function(e){l(e)})),s(""),y(""),T("Added ".concat(n.name)),R("s"),setTimeout((function(){T(null),R(null)}),3e3)})).catch((function(e){T(e.response.data),R("e"),setTimeout((function(){T(null),R(null)}),3e3)}))},newName:f,handleNameChange:function(e){s(e.target.value)},newNumber:j,handleNumberChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{filter:k,persons:t,handleDeleteButton:function(e){window.confirm("Really delete ".concat(e.name," from the phone book?"))&&E(e.id).then((function(){b().then((function(e){l(e)})),T("Deleted ".concat(e.name)),R("s"),setTimeout((function(){T(null),R(null)}),3e3)})).catch((function(n){b().then((function(e){l(e)})),T("Information of ".concat(e.name," has already been removed from server")),R("e"),setTimeout((function(){T(null),R(null)}),3e3)}))}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.38ca0419.chunk.js.map