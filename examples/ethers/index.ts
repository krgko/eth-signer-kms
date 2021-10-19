import { config } from 'dotenv'
import { ethers } from 'ethers'
import { KMSProvider } from '../../src'
import { KMSToken__factory } from './types/ethers-contracts'

config()

const getSigner = async () => {
  try {
    console.log('1. Initiating KMSProvider...')
    const kmsProvider = new KMSProvider({
      keyId: process.env.ANOTHER_KEYID,
      providerOrUrl: process.env.PROVIDER,
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION,
      chainSettings: {
        privateChain: {
          chainId: 1337,
          networkId: 2018,
          name: 'besu-dev'
        }
      }
    })

    console.log('2. KMSProvider initialized')
    console.log(
      '3. Check address before changing:',
      await kmsProvider.getAddress()
    )

    await kmsProvider.changeInitializeAddressByKeyId(process.env.KEYID)
    console.log(
      '4. Check address after changing:',
      await kmsProvider.getAddress()
    )

    const signer = new ethers.providers.Web3Provider(kmsProvider).getSigner()

    return signer
  } catch (e) {
    throw e
  }
}

const exampleTransaction = async () => {
  const signer = await getSigner()
  const myAddress = await signer.getAddress()
  console.log(`5. KMSProvider returned public key: ${myAddress}`)

  const tokenInstance = KMSToken__factory.connect(
    process.env.TOKEN_ADDRESS,
    signer
  )

  console.log('6. Getting tokens from faucet...')
  const tx = await tokenInstance.faucet()

  console.log('7. Waiting for confirmation...')
  const { status } = await tx.wait()

  if (!!status) {
    console.log('8. Checking balance...')
    const tx = await tokenInstance.balanceOf(myAddress)

    console.log(`9. Balance of ${myAddress} is ${tx.toString()}`)
  }
}

exampleTransaction()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => console.log(e))
