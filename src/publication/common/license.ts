import { z } from 'zod';

/**
 * The supported license types.
 */
export enum MetadataLicenseType {
  CCO = 'CCO',
  CC_BY = 'CC BY',
  CC_BY_ND = 'CC BY-ND',
  CC_BY_NC = 'CC BY-NC',
  TBNL_C_D_PL_Legal = 'TBNL-C-D-PL-Legal',
  TBNL_C_DT_PL_Legal = 'TBNL-C-DT-PL-Legal',
  TBNL_C_ND_PL_Legal = 'TBNL-C-ND-PL-Legal',
  TBNL_C_D_NPL_Legal = 'TBNL-C-D-NPL-Legal',
  TBNL_C_DT_NPL_Legal = 'TBNL-C-DT-NPL-Legal',
  TBNL_C_DTSA_PL_Legal = 'TBNL-C-DTSA-PL-Legal',
  TBNL_C_DTSA_NPL_Legal = 'TBNL-C-DTSA-NPL-Legal',
  TBNL_C_ND_NPL_Legal = 'TBNL-C-ND-NPL-Legal',
  TBNL_C_D_PL_Ledger = 'TBNL-C-D-PL-Ledger',
  TBNL_C_DT_PL_Ledger = 'TBNL-C-DT-PL-Ledger',
  TBNL_C_ND_PL_Ledger = 'TBNL-C-ND-PL-Ledger',
  TBNL_C_D_NPL_Ledger = 'TBNL-C-D-NPL-Ledger',
  TBNL_C_DT_NPL_Ledger = 'TBNL-C-DT-NPL-Ledger',
  TBNL_C_DTSA_PL_Ledger = 'TBNL-C-DTSA-PL-Ledger',
  TBNL_C_DTSA_NPL_Ledger = 'TBNL-C-DTSA-NPL-Ledger',
  TBNL_C_ND_NPL_Ledger = 'TBNL-C-ND-NPL-Ledger',
  TBNL_NC_D_PL_Legal = 'TBNL-NC-D-PL-Legal',
  TBNL_NC_DT_PL_Legal = 'TBNL-NC-DT-PL-Legal',
  TBNL_NC_ND_PL_Legal = 'TBNL-NC-ND-PL-Legal',
  TBNL_NC_D_NPL_Legal = 'TBNL-NC-D-NPL-Legal',
  TBNL_NC_DT_NPL_Legal = 'TBNL-NC-DT-NPL-Legal',
  TBNL_NC_DTSA_PL_Legal = 'TBNL-NC-DTSA-PL-Legal',
  TBNL_NC_DTSA_NPL_Legal = 'TBNL-NC-DTSA-NPL-Legal',
  TBNL_NC_ND_NPL_Legal = 'TBNL-NC-ND-NPL-Legal',
  TBNL_NC_D_PL_Ledger = 'TBNL-NC-D-PL-Ledger',
  TBNL_NC_DT_PL_Ledger = 'TBNL-NC-DT-PL-Ledger',
  TBNL_NC_ND_PL_Ledger = 'TBNL-NC-ND-PL-Ledger',
  TBNL_NC_D_NPL_Ledger = 'TBNL-NC-D-NPL-Ledger',
  TBNL_NC_DT_NPL_Ledger = 'TBNL-NC-DT-NPL-Ledger',
  TBNL_NC_DTSA_PL_Ledger = 'TBNL-NC-DTSA-PL-Ledger',
  TBNL_NC_DTSA_NPL_Ledger = 'TBNL-NC-DTSA-NPL-Ledger',
  TBNL_NC_ND_NPL_Ledger = 'TBNL-NC-ND-NPL-Ledger',
}

/**
 * @internal
 */
export const MetadataLicenseTypeSchema = z.nativeEnum(MetadataLicenseType);
