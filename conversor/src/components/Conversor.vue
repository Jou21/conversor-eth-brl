<template>

    <div class="conversor"> 
      
      <div style="margin-top: 0px; font-size: 25px; color: lightslategray;">
          
        1 ETH ≅ {{cotacaoEthComMask}} BRL 
      </div>

      <div>
        <img alt="Ethereum" src="../assets/logo.png" style="width: 100%; height:100%; max-width:300px; max-height:300px"/>
      </div> 

    <v-row>
      <v-col cols="12" sm="6">
        
              
                <label class="field field_v3" style=" font-style: italic;  font-size: max(30px, 4vw);  width: 100%;" >
                <input name="input1" id="input1" ref="email"  type="number" @focus="focusA = true" v-model="moedaA_value" placeholder="ETH" class="field__input" style="   height: auto;" >
                <span class="field__label-wrap">
                  <span class="field__label">Ethereum</span>
                </span>
                </label>
              
        
      </v-col>
        <v-col cols="12" sm="6">
        
              <label class="field field_v3" style=" font-style: italic;  font-size: max(30px, 4vw);  width: 100%;">
                <input name="input2" id="input2" type="number" @focus="focusB = true" v-model="moedaB_value" placeholder="BRL" class="field__input" style=" height: auto;" >
                <span class="field__label-wrap">
                <span class="field__label">Real Brasileiro</span>
                </span>
            </label>
        
      </v-col>
    </v-row>
 
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

            <span style="color: white; font-size: 15px">Atualizar a cotação</span>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
      </div>

      <div id="myDIV" v-bind:style="{ height: (windowHeight)  + 'px' }" />

      <div style="overflow-x:auto; margin-top: 0px">
  <table>
    <tr>
      <th>Exchange</th>
      <th>Cotação</th>
      
    </tr>
    <tr>
      <td>Binance</td>
      <td>R$ {{cotacaoBinance}}</td>
      
    </tr>
    <tr>
      <td>Braziliex</td>
      <td>R$ {{cotacaoBraziliex}}</td>
      
    </tr>
    <tr>
      <td>Mercado Bitcoin</td>
      <td>R$ {{cotacaoMercadoBitcoin}}</td>
      
    </tr>
    <tr>
      <td>Coinbase</td>
      <td>R$ {{cotacaoCoinbase}}</td>
      
    </tr>
    <tr>
      <td>BrasilBitcoin</td>
      <td>R$ {{cotacaoBrasilBitcoin}}</td>
      
    </tr>
  </table>
  <div style="text-align: right; margin-right: 2px">
  <small><i >Última atualização: {{ dataHoje }} às {{ horaHoje }}</i></small>
  </div>
</div>
<Sobre />
    </div>
    
</template>

<script>

import Sobre from './Sobre';

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
    props: [],
    components: {
      Sobre,
    },
    data(){
        return{
            windowHeight: window.innerHeight - 689,
            dataHoje: "",
            horaHoje: "",
            cotacaoBinance: "",
            cotacaoBraziliex: "",
            cotacaoMercadoBitcoin: "",
            cotacaoCoinbase: "",
            cotacaoBrasilBitcoin: "",
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
      
      getDataEHora() {
        var data = new Date();

        var dia     = data.getDate();           
        
        var mes     = data.getMonth();          

        var ano4    = data.getFullYear();     
        var hora    = data.getHours();          
        var min     = data.getMinutes();        

        this.dataHoje =  ("00" + dia).slice(-2) + '/' +  ("00" + (mes+1)).slice(-2)  + '/' + ano4 ;
        this.horaHoje =  ("00" + hora).slice(-2) + ':' + ("00" + min).slice(-2); 

      },

      atualizar(){
        this.getDataEHora();

        let urlBinance = "https://api.binance.com/api/v3/ticker/price?symbol=ETHBRL";

        fetch(urlBinance)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    this.cotacaoETH = json['price'];
                    let temp2 = json['price'];

                    let temp = parseFloat(temp2);
  
                    let temp3 = temp.toFixed(2);
         
                    this.moedaB_value = temp3;
                    this.moedaA_value = "1";
                    this.cotacaoEthComMask = temp3.replace(".",",");
                    this.cotacaoBinance = temp3.replace(".",",");
                });

                let urlBraziliex = "https://braziliex.com/api/v1/public/ticker/eth_brl"; 
            
            fetch(urlBraziliex)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                   
                    let temp2 = json['last'];
      
                    let temp = parseFloat(temp2);
                  
                    let temp3 = temp.toFixed(2);
            
                    this.cotacaoBraziliex = temp3.replace(".",",");
                });

        let urlMercadoBitcoin = "https://www.mercadobitcoin.net/api/ETH/ticker/";
            
            fetch(urlMercadoBitcoin)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    
                    let temp2 = json['ticker']['last'];
                   
                    let temp = parseFloat(temp2);
                   
                    let temp3 = temp.toFixed(2);
                   
                    this.cotacaoMercadoBitcoin = temp3.replace(".",",");
                });


                let urlCoinbase = "https://api.coinbase.com/v2/prices/ETH-BRL/buy";
            
            fetch(urlCoinbase)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    
                  
                    let temp2 = json['data']['amount'];
                   
                    let temp = parseFloat(temp2);
                   
                    let temp3 = temp.toFixed(2);
                
                    this.cotacaoCoinbase = temp3.replace(".",",");
                });

                 let urlBrasilBitcoin = "https://brasilbitcoin.com.br/API/prices/ETH";
            
            fetch(urlBrasilBitcoin)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                
                    let temp2 = json['last'];
               
                    let temp = parseFloat(temp2);
               
                    let temp3 = temp.toFixed(2);
                   
                    this.cotacaoBrasilBitcoin = temp3.replace(".",","); 
                });
      },

      getCotacao(){
        let urlBinance = "https://api.binance.com/api/v3/ticker/price?symbol=ETHBRL";
            
            fetch(urlBinance)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    this.cotacaoETH = json['price'];
                   
                    this.cotacaoEthComMask =  parseFloat(this.cotacaoETH.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                    this.cotacaoBinance = parseFloat(this.cotacaoETH.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                  
                    this.cotacaoEthComMaskFloat = parseFloat(this.cotacaoEthComMask.replace(",","."));
                   
                });


        let urlBraziliex = "https://braziliex.com/api/v1/public/ticker/eth_brl";
            
            fetch(urlBraziliex)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    let cotacao = json['last'];
                   
                    this.cotacaoBraziliex = parseFloat(cotacao.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                  
                });


        let urlMercadoBitcoin = "https://www.mercadobitcoin.net/api/ETH/ticker/";
            
            fetch(urlMercadoBitcoin)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    let cotacao = json['ticker']['last'];
                   
                    this.cotacaoMercadoBitcoin = parseFloat(cotacao.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                    
                });

            let urlCoinbase = "https://api.coinbase.com/v2/prices/ETH-BRL/buy";
            
            fetch(urlCoinbase)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    let cotacao = json['data']['amount'];
                    
                    this.cotacaoCoinbase = parseFloat(cotacao.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                  
                });

                let urlBrasilBitcoin = "https://brasilbitcoin.com.br/API/prices/ETH";
            
            fetch(urlBrasilBitcoin)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    let cotacao = json['last'];
                  
                    this.cotacaoBrasilBitcoin = parseFloat(cotacao.toString().replace(",",".")).toFixed(2).toString().replace(".", ",");
                   
                });
      }
    },
    mounted() {
      this.$refs.email.focus();

      window.onresize = function() {
        
        this.windowHeight = window.innerHeight;
       
        document.getElementById("myDIV").style.height = (window.innerHeight - 689) + "px";
      };

      window.addEventListener("keypress", e => {
     
        this.teclado = String.fromCharCode(e.keyCode);
       
        
      });

      window.addEventListener('keydown', function(event) {
      const key = event.key; // const {key} = event; ES6+
        if (key === "Backspace") {
          this.apertouBackspace = true;
         
        }else{
          this.apertouBackspace = false;
         
        }
      });

    

    },
    created() {
        this.getCotacao();
        this.getDataEHora();
    },
    watch: {

      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 1700)

        this.loader = null
      },
        
        moedaA_value(newValue, oldValue){
          

          let temp4 =  newValue;

          if(temp4 == ""){
            temp4 = oldValue;
          }
     
          let temp2 =  (this.cotacaoETH * parseFloat(temp4.toString().replace(",","."))).toFixed(2);
  
            if(!isNaN(temp2.replace(/[^\d]+/g,''))){
                if(this.focusA == true){
                   
                    let temp = this.cotacaoEthComMaskFloat * parseFloat(temp4);
                    
                    this.moedaB_value = temp.toFixed(2);
                    
                    this.focusB = false;
                }
            }
        
            if ((this.moedaA_value === '' || this.moedaA_value === null || this.moedaA_value.value === 0) && this.teclado != ',' && this.teclado != '.'){
                console.log("entrouu11");
                this.moedaB_value = "";
            }
        },
        
        moedaB_value(newValue, oldValue){
            
            let temp4 =  newValue;

            if(temp4 == ""){
              temp4 = oldValue;
            }
        
            let temp2 =  (this.cotacaoETH * parseFloat(temp4.toString().replace(",","."))).toFixed(2);

            if(!isNaN(temp2.replace(/[^\d]+/g,''))){
              
                if(this.focusB == true){
                 
                  let temp = parseFloat((parseFloat(temp4) / this.cotacaoEthComMaskFloat).toFixed(20))
                  
                  this.moedaA_value = temp; 
                
                  this.focusA = false;
                }
            }
         
            if ((this.moedaB_value === '' || this.moedaB_value === null || this.moedaB_value.value === 0) && this.teclado != ',' && this.teclado != '.' ){
             
                this.moedaA_value = "";
            }
        }
        
    }

};
</script>

<style scoped>

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

.field_v1 .field__label-wrap::after{
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transition: opacity .2s ease-out;
  will-change: opacity;
}

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

.field_v3 .field__label-wrap::after{
  border: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  will-change: opacity, height;
  transition: height .2s ease-out, opacity .2s ease-out;
}

.field_v3 .field__input:focus ~ .field__label-wrap::after{
  height: 100%;
}

.field{
  --fieldBorderColor: #aaaaaa;
  --fieldBorderColorActive: #4e4e4e;
}

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

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}


@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}

* {
  box-sizing: border-box;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 100%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

</style>