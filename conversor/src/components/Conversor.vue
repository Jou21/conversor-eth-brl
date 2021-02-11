<template>
    <div class="conversor"> 

      <div style="margin-top: 0px; font-size: 25px; color: lightslategray;">
        
        
          <!--v-btn
            v-on:click="atualizar"
            class="ma-2"
            :loading="loading5"
            :disabled="loading5"
            color="blue-grey darken-4"
            fab
            @click="loader = 'loading5'"
          >
            <v-icon color="white">
              mdi-cached
            </v-icon>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn-->
          
        1 ETH ≅ {{cotacaoEthComMask}} BRL 
      </div>

      <div>
        <img alt="Ethereum" src="../assets/logo.png" height="300px" width="300px"/>
      </div>

    <!--div style="text-align: -webkit-center;">
      <v-img      
        lazy-src="../assets/logo.png"
        max-height="150"
        max-width="250"
        src="../assets/logo.png"></v-img>
    </div-->

     

          
            <label class="field field_v3" style="margin-left:10px; font-style: italic;  font-size: 80px;  width: 545px;" >
                <input name="input1" id="input1" ref="email"  type="number" @focus="focusA = true" v-model="moedaA_value" v-bind:placeholder="moedaA" class="field__input" style=" width: 545px;  height: auto;" >
                <span class="field__label-wrap">
                <span class="field__label">Ethereum</span>
                </span>
            </label>
            
            <label class="field field_v3" style="margin-left:10px; font-style: italic;  font-size: 81px;  width: 545px;">
                <input name="input2" id="input2" type="number" @focus="focusB = true" v-model="moedaB_value" v-bind:placeholder="moedaB" class="field__input" style=" width: 545px;  height: auto;" >
                <span class="field__label-wrap">
                <span class="field__label">Real Brasileiro</span>
                </span>
            </label>
            
 
  <!--v-btn
      v-on:click="atualizar"
      :loading="loading5"
      :disabled="loading5"
      color="blue-grey darken-4"
      class="ma-2 white--text"
      fab
      @click="loader = 'loading5'"
    >
      <v-icon dark>
        mdi-refresh
      </v-icon>
    </v-btn-->

      <div style="margin-top: 50px">
          <v-btn
            style="height: 50px"
            v-on:click="atualizar"
            class="ma-2"
            :loading="loading5"
            :disabled="loading5"
            color="blue-grey darken-4"
            
            @click="loader = 'loading5'"
          >
            <!--v-icon color="white">
              mdi-cached
            </v-icon-->
            <span style="color: white; font-size: 15px">Atualizar a cotação</span>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
      </div>

    </div>
</template>

<script>
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
  const currencyMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    includeThousandsSeparator: false,
    allowNegative: false,
    decimalSymbol: ',',
    decimalLimit: 13,
  });

 
export default {
    name: "Conversor",
    props: ["moedaA", "moedaB"],
    data(){
        return{
            moedaA_value : "",
            moedaB_value : "",
            cotacaoETH: "", 
            mask: currencyMask,
            focusA: false,
            focusB: false,
            cotacaoEthComMask: "",
            cotacaoEthComMaskFloat: "",
            loader: null,
            loading5: false,
            teclado: "",
            apertouBackspace: false,
        };
    },
    methods:{
      


      atualizar(){
        let url = "https://www.mercadobitcoin.net/api/ETH/ticker/"
            
            fetch(url)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    this.cotacaoETH = json['ticker']['last'];
                    let temp2 = json['ticker']['last'];
                    //console.log("temp22222",temp2)
                    //let temp = parseFloat(temp2.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                    //console.log("temp1111111", temp2);
                    let temp = parseFloat(temp2);
                    //console.log("temp444444", temp);
                    let temp3 = temp.toFixed(2);
                    console.log("Cotação do MercadoBitcoin", temp3);
                    this.moedaB_value = temp3;
                    this.moedaA_value = "1";
                    //this.cotacaoEthComMask =  parseFloat(this.cotacaoETH.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                    this.cotacaoEthComMask = temp3.replace(".",",");
                    
                });
      },

      getCotacao(){
        let url = "https://www.mercadobitcoin.net/api/ETH/ticker/"
            
            fetch(url)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    this.cotacaoETH = json['ticker']['last'];
                    //console.log('cotacaoETH',this.cotacaoETH);
                    //console.log(typeof this.cotacaoETH);
                    this.cotacaoEthComMask =  parseFloat(this.cotacaoETH.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                    //console.log('cotacaoEthComMask',this.cotacaoEthComMask);
                    //console.log(typeof this.cotacaoEthComMask);
                    this.cotacaoEthComMaskFloat = parseFloat(this.cotacaoEthComMask.replace(",","."));
                    //console.log('cotacaoEthComMaskFloat',this.cotacaoEthComMaskFloat);
                    //console.log(typeof cotacaoEthComMaskFloat);
                });
      }
    },
    mounted() {
      this.$refs.email.focus();
      window.addEventListener("keypress", e => {
        //console.log("Deu Certo",String.fromCharCode(e.keyCode));
        this.teclado = String.fromCharCode(e.keyCode);
        console.log("TECLADO",this.teclado);
        
      });

      window.addEventListener('keydown', function(event) {
      const key = event.key; // const {key} = event; ES6+
        if (key === "Backspace") {
          this.apertouBackspace = true;
          //this.teclado = '5';
          console.log("TECLADO",this.teclado);
          console.log("FUNCIONOU");
        }else{
          this.apertouBackspace = false;
          console.log("outra tecla");
        }
      });

    

    },
    created() {
        this.getCotacao();
    },
    watch: {

      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 1700)

        this.loader = null
      },
        
        moedaA_value(newValue, oldValue){
          


          //console.log("moedaA", typeof newValue);
          //console.log("moedaA");
          let temp4 =  newValue//.replace(/[^\d]+/g,'');

          if(temp4 == ""){
            temp4 = oldValue;
          }
          console.log("temp4", temp4);

          let temp2 =  (this.cotacaoETH * parseFloat(temp4.toString().replace(",","."))).toFixed(2);
          //console.log("temp2", temp2)
          //console.log("tipoTemp2",typeof temp2)
          console.log("BoolA", !isNaN(temp2.replace(/[^\d]+/g,'')));
            if(!isNaN(temp2.replace(/[^\d]+/g,''))){
                if(this.focusA == true){
                    //console.log("newValue",newValue);
                    //console.log("tipoNewValue",typeof newValue);
                    //let temp =  (this.cotacaoETH * parseFloat(newValue.toString().replace(",","."))).toFixed(2).toString().replace(".", ",");
                    //console.log("temp22222222")
                    let temp = this.cotacaoEthComMaskFloat * parseFloat(temp4);
                    
                    //console.log("tempB", temp);
                    //console.log("tempB", typeof temp);
                    this.moedaB_value = temp.toFixed(2);
                    //console.log("moedaB_value", this.moedaB_value);
                    //console.log("moedaB_value", typeof this.moedaB_value);
                    this.focusB = false;
                }
            }
            //if(temp4 == "NaN" || temp4 == ""){
            if ((this.moedaA_value === '' || this.moedaA_value === null || this.moedaA_value.value === 0) && this.teclado != ',' && this.teclado != '.'){
                console.log("entrouu11");
                this.moedaB_value = "";
            }
        },
        
        moedaB_value(newValue, oldValue){
            //console.log("moedaB");
            //console.log(newValue)
            let temp4 =  newValue//.replace(/[^\d]+/g,'');

            if(temp4 == ""){
              temp4 = oldValue;
            }
            console.log("temp4", temp4);
            
            //console.log("newValue", typeof newValue);
            let temp2 =  (this.cotacaoETH * parseFloat(temp4.toString().replace(",","."))).toFixed(2);

            //console.log("moedaB2",temp2);
            //console.log("temp2", temp2)
            //console.log("tipoTemp2",typeof temp2)
            console.log("BoolB", !isNaN(temp2.replace(/[^\d]+/g,'')));
            if(!isNaN(temp2.replace(/[^\d]+/g,''))){
              console.log("temp444444444")
                if(this.focusB == true){
                  //let temp = (parseFloat(newValue.toString().replace(",","."))/this.cotacaoETH).toFixed(20).toString().replace(".", ","); 
                  console.log("temp333333333")
                  //console.log("newValue", newValue+"eae")

                  console.log("cotacaoEthComMaskFloat",this.cotacaoEthComMaskFloat)
                  let temp = parseFloat((parseFloat(temp4) / this.cotacaoEthComMaskFloat).toFixed(20))
                  
                  //console.log("tempA", temp);
                  //console.log("tempA", typeof temp);
                  this.moedaA_value = temp; 
                  //console.log("moedaA_value", this.moedaA_value);
                  //console.log("moedaA_value", typeof this.moedaA_value);
                  this.focusA = false;
                }
            }
            //if(temp4 == "NaN" || temp4 == ""){
            if ((this.moedaB_value === '' || this.moedaB_value === null || this.moedaB_value.value === 0) && this.teclado != ',' && this.teclado != '.' ){
                console.log("entrouu22");
                this.moedaA_value = "";
            }
        }
        
    }

};
</script>

<style scoped>

    
/*
=====
RESET STYLES
=====
*/

.field__input{ 
  --uiFieldPlaceholderColor: var(--fieldPlaceholderColor, #767676);
  
  background-color: transparent;
  border-radius: 0;
  border: none;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: inherit;
}

.field__input:focus::-webkit-input-placeholder{
  color: var(--uiFieldPlaceholderColor);
}

.field__input:focus::-moz-placeholder{
  color: var(--uiFieldPlaceholderColor);
}

/*
=====
CORE STYLES
=====
*/

.field{
  --uiFieldBorderWidth: var(--fieldBorderWidth, 2px);
  --uiFieldPaddingRight: var(--fieldPaddingRight, 1rem);
  --uiFieldPaddingLeft: var(--fieldPaddingLeft, 1rem);   
  --uiFieldBorderColorActive: var(--fieldBorderColorActive, rgba(22, 22, 22, 1));

  display: var(--fieldDisplay, inline-flex);
  position: relative;
  font-size: var(--fieldFontSize, 1rem);
}

.field__input{
  box-sizing: border-box;
  width: var(--fieldWidth, 100%);
  height: var(--fieldHeight, 3rem);
  padding: var(--fieldPaddingTop, 1.25rem) var(--uiFieldPaddingRight) var(--fieldPaddingBottom, .5rem) var(--uiFieldPaddingLeft);
  border-bottom: var(--uiFieldBorderWidth) solid var(--fieldBorderColor, rgba(0, 0, 0, .25));  
}

.field__input:focus{
  outline: none;
}

.field__input::-webkit-input-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input::-moz-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input:focus::-webkit-input-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__input:focus::-moz-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__label-wrap{
  box-sizing: border-box;
  pointer-events: none;
  cursor: text;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.field__label-wrap::after{
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 0;
  opacity: 0;

  position: absolute;
  bottom: 0;
  left: 0;
}

.field__input:focus ~ .field__label-wrap::after{
  opacity: 1;
}

.field__label{
  position: absolute;
  left: var(--uiFieldPaddingLeft);
  top: calc(50% - .5em);

  line-height: 1;
  font-size: var(--fieldHintFontSize, inherit);

  transition: top .2s cubic-bezier(0.9, -0.15, 0.1, 1.15), opacity .2s ease-out, font-size .2s ease-out;
  will-change: bottom, opacity, font-size;
}

.field__input:focus ~ .field__label-wrap .field__label,
.field__input:not(:placeholder-shown) ~ .field__label-wrap .field__label{
  --fieldHintFontSize: var(--fieldHintFontSizeFocused, .75rem);

  top: var(--fieldHintTopHover, .25rem);
}

/* 
effect 1
*/

.field_v1 .field__label-wrap::after{
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transition: opacity .2s ease-out;
  will-change: opacity;
}

/* 
effect 2
*/

.field_v2 .field__label-wrap{
  overflow: hidden;
}

.field_v2 .field__label-wrap::after{
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transform: translate3d(-105%, 0, 0);
  will-change: transform, opacity;
  transition: transform .285s ease-out .2s, opacity .2s ease-out .2s;
}

.field_v2 .field__input:focus ~ .field__label-wrap::after{
  transform: translate3d(0, 0, 0);
  transition-delay: 0;
}

/*
effect 3
*/

.field_v3 .field__label-wrap::after{
  border: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  will-change: opacity, height;
  transition: height .2s ease-out, opacity .2s ease-out;
}

.field_v3 .field__input:focus ~ .field__label-wrap::after{
  height: 100%;
}

/*
=====
LEVEL 4. SETTINGS
=====
*/

.field{
  --fieldBorderColor: #aaaaaa;
  --fieldBorderColorActive: #4e4e4e;
}

/*
=====
DEMO
=====
*/

body{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Open Sans, Ubuntu, Fira Sans, Helvetica Neue, sans-serif;
  margin: 0;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page{
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
  margin: auto;
  padding: 1rem;

  display: grid;
  grid-gap: 30px;
}


.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
}
input[type=number] { 
   -moz-appearance: textfield;
   appearance: textfield;

}

</style>