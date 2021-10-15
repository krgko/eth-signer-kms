/* eslint-disable @typescript-eslint/no-var-requires */
require('ts-node/register')
require('dotenv').config()

const { KMSProvider } = require('@rumblefishdev/eth-signer-kms')

module.exports = {
  networks: {
    ropsten: {
      provider: () =>
        new KMSProvider({
          keyId: process.env.KEYID,
          providerOrUrl: process.env.PROVIDER,
          accessKeyId: process.env.ACCESSKEYID,
          secretAccessKey: process.env.SECRETACCESSKEY,
          region: process.env.REGION
        }),
      network_id: 3,
      confirmations: 2,
      skipDryRun: true
    },
    besu: {
      provider: () =>
        new KMSProvider({
          keyId: process.env.KEYID,
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
        }),
      network_id: 2018,
      gas: 0x1fffffffffffff,
      gasPrice: 0,
      networkCheckTimeout: 1000000
    }
  },
  compilers: {
    solc: {
      version: '0.8.3'
    }
  }
}
