import {ethers, providers} from "./ethers-5.6.esm.min.js"
import {abi, contractAddress} from "./constants.js"
import { sign } from "crypto"



const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
connectButton.onclick = connect 
fundButton.onclick = fund 
console.log(ethers)
 
async function connect() {
    if (typeof window.ethereum !== "undefined"){
        await ethereum.request({ method: 'eth_requestAccounts' }); 
        connectButton.innerHTML =
         "connected"
    } else {
     connectButton.innerHTML = 
        "Please install metamsk!"
    }
} 

async function fund() { 
    const ethAmount = document.getElementById("ethAmount")
 console.log('funding with ${ethAmount}...')
 if (typeof window.ethereum !== "undefined"){
    // provider / connection to the blockchain
    // signer / wallet / someone eith some gas 
    // contract that we are interacting with 
    // ABI % address 
    const provided = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provided.getSigner()
    try {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const transactionResponse = await contract.fund({value: ethers.utils.parseEther(ethAmount),
    })
  } catch (error) {
    console.log(error)
  } 
 }
}

function listenForTransactionMine(transactionResponse, provided ) {
    console.log(`mining ${transactionResponse.hash}...`)
    // listen for this transaction to finish 
    return new Promise((resolve, reject) =>{
        providers.once(transactionResponse.hash,(transactionReceipt) => {
            console.log(
                `Completed with  ${transactionResponse.confirmations} confirmation`
            )
            resolve()
    })
  })
}
