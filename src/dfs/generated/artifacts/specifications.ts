/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
// tslint:disable:object-literal-sort-keys

import * as msRest from "@azure/ms-rest-js";

import * as Mappers from "./mappers";
import { Operation } from "./operation";
import * as Parameters from "./parameters";

const serializer = new msRest.Serializer(Mappers, true);
// specifications for new method group start
const serviceListFileSystemsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.resource0,
    Parameters.prefix,
    Parameters.continuation,
    Parameters.maxResults,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.requestId,
    Parameters.version
  ],
  responses: {
    200: {
      bodyMapper: Mappers.FileSystemList,
      headersMapper: Mappers.ServiceListFileSystemsHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

// specifications for new method group start
const fileSystemCreateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "{filesystem}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem
  ],
  queryParameters: [
    Parameters.resource1,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.properties,
    Parameters.requestId,
    Parameters.version
  ],
  responses: {
    201: {
      headersMapper: Mappers.FileSystemCreateHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const fileSystemSetPropertiesOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "{filesystem}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem
  ],
  queryParameters: [
    Parameters.resource1,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.properties,
    Parameters.requestId,
    Parameters.version,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.FileSystemSetPropertiesHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const fileSystemGetPropertiesOperationSpec: msRest.OperationSpec = {
  httpMethod: "HEAD",
  path: "{filesystem}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem
  ],
  queryParameters: [
    Parameters.resource1,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.requestId,
    Parameters.version
  ],
  responses: {
    200: {
      headersMapper: Mappers.FileSystemGetPropertiesHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const fileSystemDeleteOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "{filesystem}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem
  ],
  queryParameters: [
    Parameters.resource1,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.requestId,
    Parameters.version,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    202: {
      headersMapper: Mappers.FileSystemDeleteHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const fileSystemListPathsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "{filesystem}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem
  ],
  queryParameters: [
    Parameters.continuation,
    Parameters.path0,
    Parameters.recursive0,
    Parameters.maxResults,
    Parameters.upn,
    Parameters.resource1,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.requestId,
    Parameters.version
  ],
  responses: {
    200: {
      bodyMapper: Mappers.PathList,
      headersMapper: Mappers.FileSystemListPathsHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const fileSystemListBlobHierarchySegmentOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "{filesystem}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem
  ],
  queryParameters: [
    Parameters.prefix,
    Parameters.delimiter,
    Parameters.marker,
    Parameters.maxResults,
    Parameters.include,
    Parameters.showonly,
    Parameters.timeout,
    Parameters.restype,
    Parameters.comp0
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ListBlobsHierarchySegmentResponse,
      headersMapper: Mappers.FileSystemListBlobHierarchySegmentHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

// specifications for new method group start
const pathCreateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.resource2,
    Parameters.continuation,
    Parameters.mode0,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.renameSource,
    Parameters.sourceLeaseId,
    Parameters.properties,
    Parameters.permissions,
    Parameters.umask,
    Parameters.owner,
    Parameters.group,
    Parameters.acl,
    Parameters.proposedLeaseId,
    Parameters.leaseDuration,
    Parameters.expiryOptions0,
    Parameters.expiresOn,
    Parameters.encryptionContext,
    Parameters.requestId,
    Parameters.version,
    Parameters.cacheControl,
    Parameters.contentEncoding,
    Parameters.contentLanguage,
    Parameters.contentDisposition,
    Parameters.contentType,
    Parameters.leaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.sourceIfMatch,
    Parameters.sourceIfNoneMatch,
    Parameters.sourceIfModifiedSince,
    Parameters.sourceIfUnmodifiedSince,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm
  ],
  responses: {
    201: {
      headersMapper: Mappers.PathCreateHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.action0,
    Parameters.maxRecords,
    Parameters.continuation,
    Parameters.mode1,
    Parameters.forceFlag,
    Parameters.position,
    Parameters.retainUncommittedData,
    Parameters.close,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.contentLength,
    Parameters.properties,
    Parameters.owner,
    Parameters.group,
    Parameters.permissions,
    Parameters.acl,
    Parameters.requestId,
    Parameters.version,
    Parameters.contentMD5,
    Parameters.cacheControl,
    Parameters.contentType,
    Parameters.contentDisposition,
    Parameters.contentEncoding,
    Parameters.contentLanguage,
    Parameters.leaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  requestBody: {
    parameterPath: "body",
    mapper: {
      required: true,
      serializedName: "body",
      type: {
        name: "Stream"
      }
    }
  },
  contentType: "application/octet-stream",
  responses: {
    200: {
      bodyMapper: Mappers.SetAccessControlRecursiveResponse,
      headersMapper: Mappers.PathUpdateHeaders
    },
    202: {
      headersMapper: Mappers.PathUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathLeaseOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.xMsLeaseAction,
    Parameters.xMsLeaseDuration,
    Parameters.xMsLeaseBreakPeriod,
    Parameters.proposedLeaseId,
    Parameters.requestId,
    Parameters.version,
    Parameters.leaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.PathLeaseHeaders
    },
    201: {
      headersMapper: Mappers.PathLeaseHeaders
    },
    202: {
      headersMapper: Mappers.PathLeaseHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathReadOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.range,
    Parameters.xMsRangeGetContentMd5,
    Parameters.requestId,
    Parameters.version,
    Parameters.leaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "Stream",
        type: {
          name: "Stream"
        }
      },
      headersMapper: Mappers.PathReadHeaders
    },
    206: {
      bodyMapper: {
        serializedName: "Stream",
        type: {
          name: "Stream"
        }
      },
      headersMapper: Mappers.PathReadHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathGetPropertiesOperationSpec: msRest.OperationSpec = {
  httpMethod: "HEAD",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.action1,
    Parameters.upn,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.requestId,
    Parameters.version,
    Parameters.leaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.PathGetPropertiesHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathDeleteOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.recursive1,
    Parameters.continuation,
    Parameters.paginated,
    Parameters.timeout
  ],
  headerParameters: [
    Parameters.requestId,
    Parameters.version,
    Parameters.leaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.PathDeleteHeaders
    },
    202: {
      headersMapper: Mappers.PathDeleteHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathSetAccessControlOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.timeout,
    Parameters.action2
  ],
  headerParameters: [
    Parameters.owner,
    Parameters.group,
    Parameters.permissions,
    Parameters.acl,
    Parameters.requestId,
    Parameters.version,
    Parameters.leaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.PathSetAccessControlHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathSetAccessControlRecursiveOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.timeout,
    Parameters.continuation,
    Parameters.mode1,
    Parameters.forceFlag,
    Parameters.maxRecords,
    Parameters.action3
  ],
  headerParameters: [
    Parameters.acl,
    Parameters.requestId,
    Parameters.version
  ],
  responses: {
    200: {
      bodyMapper: Mappers.SetAccessControlRecursiveResponse,
      headersMapper: Mappers.PathSetAccessControlRecursiveHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathFlushDataOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.timeout,
    Parameters.position,
    Parameters.retainUncommittedData,
    Parameters.close,
    Parameters.action4
  ],
  headerParameters: [
    Parameters.contentLength,
    Parameters.leaseAction,
    Parameters.leaseDuration,
    Parameters.proposedLeaseId,
    Parameters.requestId,
    Parameters.version,
    Parameters.contentMD5,
    Parameters.cacheControl,
    Parameters.contentType,
    Parameters.contentDisposition,
    Parameters.contentEncoding,
    Parameters.contentLanguage,
    Parameters.leaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm
  ],
  responses: {
    200: {
      headersMapper: Mappers.PathFlushDataHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathAppendDataOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.position,
    Parameters.timeout,
    Parameters.flush,
    Parameters.action5
  ],
  headerParameters: [
    Parameters.contentLength,
    Parameters.transactionalContentCrc64,
    Parameters.leaseAction,
    Parameters.leaseDuration,
    Parameters.proposedLeaseId,
    Parameters.requestId,
    Parameters.version,
    Parameters.transactionalContentHash,
    Parameters.leaseId,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm
  ],
  requestBody: {
    parameterPath: "body",
    mapper: {
      required: true,
      serializedName: "body",
      type: {
        name: "Stream"
      }
    }
  },
  responses: {
    202: {
      headersMapper: Mappers.PathAppendDataHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathSetExpiryOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.timeout,
    Parameters.comp1
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.expiryOptions1,
    Parameters.expiresOn
  ],
  responses: {
    200: {
      headersMapper: Mappers.PathSetExpiryHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const pathUndeleteOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "{filesystem}/{path}",
  urlParameters: [
    Parameters.url,
    Parameters.fileSystem,
    Parameters.path1
  ],
  queryParameters: [
    Parameters.timeout,
    Parameters.comp2
  ],
  headerParameters: [
    Parameters.undeleteSource,
    Parameters.version,
    Parameters.requestId
  ],
  responses: {
    200: {
      headersMapper: Mappers.PathUndeleteHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError
    }
  },
  isXML: true,
  serializer
};

const Specifications: { [key: number]: msRest.OperationSpec } = {};
Specifications[Operation.Service_ListFileSystems] = serviceListFileSystemsOperationSpec;
Specifications[Operation.FileSystem_Create] = fileSystemCreateOperationSpec;
Specifications[Operation.FileSystem_SetProperties] = fileSystemSetPropertiesOperationSpec;
Specifications[Operation.FileSystem_GetProperties] = fileSystemGetPropertiesOperationSpec;
Specifications[Operation.FileSystem_Delete] = fileSystemDeleteOperationSpec;
Specifications[Operation.FileSystem_ListPaths] = fileSystemListPathsOperationSpec;
Specifications[Operation.FileSystem_ListBlobHierarchySegment] = fileSystemListBlobHierarchySegmentOperationSpec;
Specifications[Operation.Path_Create] = pathCreateOperationSpec;
Specifications[Operation.Path_Update] = pathUpdateOperationSpec;
Specifications[Operation.Path_Lease] = pathLeaseOperationSpec;
Specifications[Operation.Path_Read] = pathReadOperationSpec;
Specifications[Operation.Path_GetProperties] = pathGetPropertiesOperationSpec;
Specifications[Operation.Path_Delete] = pathDeleteOperationSpec;
Specifications[Operation.Path_SetAccessControl] = pathSetAccessControlOperationSpec;
Specifications[Operation.Path_SetAccessControlRecursive] = pathSetAccessControlRecursiveOperationSpec;
Specifications[Operation.Path_FlushData] = pathFlushDataOperationSpec;
Specifications[Operation.Path_AppendData] = pathAppendDataOperationSpec;
Specifications[Operation.Path_SetExpiry] = pathSetExpiryOperationSpec;
Specifications[Operation.Path_Undelete] = pathUndeleteOperationSpec;
export default Specifications;
