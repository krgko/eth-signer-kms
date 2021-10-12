import { KMS } from 'aws-sdk'
import Common, { CommonOpts } from '@ethereumjs/common'

export type SignParams = {
  keyId: KMS.SignRequest['KeyId']
  message: Buffer
}

export type CreateSignatureParams = SignParams & {
  address: string
  txOpts?: Common
}

export type PrivateChain = {
  name: string
  chainId: number
  networkId: number
}

export type ChainSettings = Omit<CommonOpts, 'chain'> & {
  chain?: CommonOpts['chain']
  privateChain?: PrivateChain
}

export type KMSProviderConstructor = {
  keyId: KMS.KeyIdType
  accessKeyId: string
  secretAccessKey: string
  region: string
  providerOrUrl: string
  shareNonce?: boolean
  pollingInterval?: number
  chainSettings?: ChainSettings
}
