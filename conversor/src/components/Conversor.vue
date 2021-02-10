<template>
    <div class="conversor"> 
        <!--h2>{{moedaA}} - {{moedaB}}</h2-->
        <input type="text" @focus="focusA = true" v-model="moedaA_value" v-bind:placeholder="moedaA" >
        <input type="text" @focus="focusB = true" v-model="moedaB_value" v-bind:placeholder="moedaB" >

    </div>
</template>

<script>


export default {
    name: "Conversor",
    props: ["moedaA", "moedaB"],
    data(){
        return{
            moedaA_value : "1",
            moedaB_value : "",
            cotacaoETH: "", 
            mask: "",
            focusA: false,
            focusB: false,
        };
    },
    methods:{

    },
    created() {
        

        let url = "https://www.mercadobitcoin.net/api/ETH/ticker/"
            
            fetch(url)
                .then(res=>{
                    return res.json();
                    })
                .then(json=>{
                    this.cotacaoETH = json['ticker']['last'];
                    this.moedaB_value = json['ticker']['last'];
                    //let temp = JSON.stringify(this.moedaB_value);
                    //let tempFloat = parseFloat(temp);
                    let temp = parseFloat(this.moedaB_value).toFixed(2).toString().replace(".", ",");
                    console.log(temp);
                    this.moedaB_value = temp;
                    
                });
    },
    watch: {
        
        moedaA_value(newValue){
            if(!isNaN(newValue)){
                if(this.focusA == true){
                    this.moedaB_value = (this.cotacaoETH * parseFloat(newValue)).toFixed(2).toString().replace(".", ",");
                    this.focusB = false;
                }
            }
            if(newValue == "NaN"){
                console.log("entrouu");
                this.moedaA_value = "";
            }
        },
        
        moedaB_value(newValue){
            console.log("watchB",newValue);
            if(!isNaN(newValue)){
                if(this.focusB == true){
                    this.moedaA_value = (parseFloat(newValue)/this.cotacaoETH).toFixed(20).toString().replace(".", ",");        
                    this.focusA = false;
                }
            }
            if(newValue == "NaN"){
                console.log("entrouu");
                this.moedaB_value = "";
            }
        }
        
    }

};
</script>

<style scoped>

</style>