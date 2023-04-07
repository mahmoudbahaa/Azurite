import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  DataLakeFileSystemClient,
  DataLakeServiceClient,
  FileSystemSASPermissions,
  generateAccountSASQueryParameters,
  generateDataLakeSASQueryParameters,
  newPipeline,
  SASProtocol,
  StorageSharedKeyCredential
} from "@azure/storage-file-datalake";

import { configLogger } from "../../../src/common/Logger";
import { SimpleTokenCredential } from "../../simpleTokenCredential";
import {
  EMULATOR_ACCOUNT_KEY,
  EMULATOR_ACCOUNT_NAME,
  generateJWTToken,
  getUniqueName,
  upload
} from "../../testutils";
import DataLakeTestServerFactory from "../DataLakeTestServerFactory";

// Set true to enable debug log
configLogger(false);

describe("Blob OAuth Basic", () => {
  const factory = new DataLakeTestServerFactory();
  let server = factory.createServer(false, false, true, "basic");
  const baseURL = `https://${server.config.host}:${server.config.port}/devstoreaccount1`;

  before(async () => {
    await server.start();
  });

  after(async () => {
    await server.close();
    await server.clean();
  });

  it(`Should work with create container @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://storage.azure.com",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);

    await containerClient.create();
    await containerClient.delete();
  });

  it(`Should work with delegation SAS @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://storage.azure.com",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const startTime = new Date();
    startTime.setHours(startTime.getHours() - 1);
    const expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + 1);

    const userDelegationKey = await serviceClient.getUserDelegationKey(
      startTime,
      expiryTime
    );

    const containerName: string = getUniqueName("1container-with-dash");

    const sasExpirytime = new Date();
    sasExpirytime.setHours(sasExpirytime.getHours() + 1);

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: containerName,
        expiresOn: sasExpirytime,
        permissions: FileSystemSASPermissions.parse("racwdl")
      },
      userDelegationKey,
      "devstoreaccount1"
    );

    const containerClient = new DataLakeFileSystemClient(
      `${serviceClient.url}/${containerName}?${containerSAS}`,
      newPipeline(new AnonymousCredential())
    );
    await containerClient.create();
    await containerClient.delete();
  });

  it(`Should work with delegation SAS container client doing blob upload @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://storage.azure.com",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const startTime = new Date();
    startTime.setHours(startTime.getHours() - 1);
    const expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + 1);

    const userDelegationKey = await serviceClient.getUserDelegationKey(
      startTime,
      expiryTime
    );

    const containerName: string = getUniqueName("1container-with-dash");

    const sasExpirytime = new Date();
    sasExpirytime.setHours(sasExpirytime.getHours() + 1);

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: containerName,
        expiresOn: sasExpirytime,
        permissions: FileSystemSASPermissions.parse("racwdl")
      },
      userDelegationKey,
      "devstoreaccount1"
    );

    const containerClient = new DataLakeFileSystemClient(
      `${serviceClient.url}/${containerName}?${containerSAS}`,
      newPipeline(new AnonymousCredential())
    );
    await containerClient.create();
    const blobClient = await containerClient.getFileClient("test");
    const data = "Test Data";
    await upload(blobClient, data);
    await containerClient.delete();
  });

  it(`Should fail with delegation SAS with invalid time duration @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://storage.azure.com",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );
    const containerName: string = getUniqueName("1container-with-dash");

    // Later user delegation key start time
    let startTime = new Date();
    startTime.setMinutes(startTime.getMinutes() + 20);
    let expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + 1);
    let userDelegationKey = await serviceClient.getUserDelegationKey(
      startTime,
      expiryTime
    );

    let sasExpirytime = new Date();
    sasExpirytime.setHours(sasExpirytime.getHours() + 1);

    let containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: containerName,
        expiresOn: sasExpirytime,
        permissions: FileSystemSASPermissions.parse("racwdl")
      },
      userDelegationKey,
      "devstoreaccount1"
    );

    let containerClient = new DataLakeFileSystemClient(
      `${serviceClient.url}/${containerName}?${containerSAS}`,
      newPipeline(new AnonymousCredential())
    );
    let failed = false;
    try {
      await containerClient.create();
    } catch (err) {
      failed = true;
      assert.equal(err.statusCode, 403);
    }
    assert.ok(failed);

    // Eearlier user delegation key expirty time
    startTime = new Date();
    startTime.setDate(startTime.getDate() - 1);
    expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() - 1);
    userDelegationKey = await serviceClient.getUserDelegationKey(
      startTime,
      expiryTime
    );

    sasExpirytime = new Date();
    sasExpirytime.setHours(sasExpirytime.getHours() + 1);

    containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: containerName,
        expiresOn: sasExpirytime,
        permissions: FileSystemSASPermissions.parse("racwdl")
      },
      userDelegationKey,
      "devstoreaccount1"
    );

    containerClient = new DataLakeFileSystemClient(
      `${serviceClient.url}/${containerName}?${containerSAS}`,
      newPipeline(new AnonymousCredential())
    );

    failed = false;
    try {
      await containerClient.create();
    } catch (err) {
      failed = true;
      assert.equal(err.statusCode, 403);
    }
    assert.ok(failed);
  });

  it(`Should fail with delegation SAS with access policy @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://storage.azure.com",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const startTime = new Date();
    startTime.setHours(startTime.getHours() - 1);
    const expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const userDelegationKey = await serviceClient.getUserDelegationKey(
      startTime,
      expiryTime
    );

    const serviceClientWithAccountKey = new DataLakeServiceClient(
      baseURL,
      newPipeline(
        new StorageSharedKeyCredential(
          EMULATOR_ACCOUNT_NAME,
          EMULATOR_ACCOUNT_KEY
        ),
        {
          retryOptions: { maxTries: 1 },
          // Make sure socket is closed once the operation is done.
          keepAliveOptions: { enable: false }
        }
      )
    );
    const containerName: string = getUniqueName("1container-with-dash");
    const containerClientWithKey =
      serviceClientWithAccountKey.getFileSystemClient(containerName);
    await containerClientWithKey.create();
    await containerClientWithKey.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          permissions: "racwdl"
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
    ]);

    const sasExpirytime = new Date();
    sasExpirytime.setHours(sasExpirytime.getHours() + 1);

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: containerName,
        expiresOn: sasExpirytime,
        permissions: FileSystemSASPermissions.parse("racwdl"),
        identifier: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      },
      userDelegationKey,
      "devstoreaccount1"
    );

    const containerClient = new DataLakeFileSystemClient(
      `${serviceClient.url}/${containerName}?${containerSAS}`,
      newPipeline(new AnonymousCredential())
    );

    let failed = false;
    try {
      await containerClient.getProperties();
    } catch (err) {
      failed = true;
      assert.equal(err.statusCode, 403);
    }
    assert.ok(failed);
  });

  it(`Should not work with invalid JWT token @loki @sql`, async () => {
    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential("invalid token"), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);

    try {
      await containerClient.create();
      await containerClient.delete();
    } catch (err) {
      assert.deepStrictEqual(
        err.message.includes("Server failed to authenticate the request."),
        true
      );
      return;
    }
    assert.fail();
  });

  it(`Should work with valid audiences @loki @sql`, async () => {
    const audiences = [
      "https://storage.azure.com",
      "https://storage.azure.com/",
      "e406a681-f3d4-42a8-90b6-c2b029497af1",
      "https://devstoreaccount1.blob.core.windows.net",
      "https://devstoreaccount1.blob.core.windows.net/",
      "https://devstoreaccount1.blob.core.chinacloudapi.cn",
      "https://devstoreaccount1.blob.core.chinacloudapi.cn/",
      "https://devstoreaccount1.blob.core.usgovcloudapi.net",
      "https://devstoreaccount1.blob.core.usgovcloudapi.net/",
      "https://devstoreaccount1.blob.core.cloudapi.de",
      "https://devstoreaccount1.blob.core.cloudapi.de/"
    ];

    for (const audience of audiences) {
      const token = generateJWTToken(
        new Date("2019/01/01"),
        new Date("2019/01/01"),
        new Date("2100/01/01"),
        "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
        audience,
        "user_impersonation",
        "23657296-5cd5-45b0-a809-d972a7f4dfe1",
        "dd0d0df1-06c3-436c-8034-4b9a153097ce"
      );

      const serviceClient = new DataLakeServiceClient(
        baseURL,
        newPipeline(new SimpleTokenCredential(token), {
          retryOptions: { maxTries: 1 },
          // Make sure socket is closed once the operation is done.
          keepAliveOptions: { enable: false }
        })
      );

      const containerName: string = getUniqueName("1container-with-dash");
      const containerClient = serviceClient.getFileSystemClient(containerName);

      await containerClient.create();
      await containerClient.delete();
    }
  });

  it(`Should not work with invalid audiences @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://invalidaccount.blob.core.windows.net",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);

    try {
      await containerClient.create();
      await containerClient.delete();
    } catch (err) {
      assert.deepStrictEqual(
        err.message.includes("Server failed to authenticate the request."),
        true
      );
      assert.deepStrictEqual(
        err.details.AuthenticationErrorDetail.includes("audience"),
        true
      );
      return;
    }
    assert.fail();
  });

  it(`Should work with valid issuers @loki @sql`, async () => {
    const issuerPrefixes = [
      "https://sts.windows.net/",
      "https://sts.microsoftonline.de/",
      "https://sts.chinacloudapi.cn/",
      "https://sts.windows-ppe.net"
    ];

    for (const issuerPrefix of issuerPrefixes) {
      const token = generateJWTToken(
        new Date("2019/01/01"),
        new Date("2019/01/01"),
        new Date("2100/01/01"),
        `${issuerPrefix}/ab1f708d-50f6-404c-a006-d71b2ac7a606/`,
        "e406a681-f3d4-42a8-90b6-c2b029497af1",
        "user_impersonation",
        "23657296-5cd5-45b0-a809-d972a7f4dfe1",
        "dd0d0df1-06c3-436c-8034-4b9a153097ce"
      );

      const serviceClient = new DataLakeServiceClient(
        baseURL,
        newPipeline(new SimpleTokenCredential(token), {
          retryOptions: { maxTries: 1 },
          // Make sure socket is closed once the operation is done.
          keepAliveOptions: { enable: false }
        })
      );

      const containerName: string = getUniqueName("1container-with-dash");
      const containerClient = serviceClient.getFileSystemClient(containerName);

      await containerClient.create();
      await containerClient.delete();
    }
  });

  it(`Should not work with invalid issuers @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://invalidissuer/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://invalidaccount.blob.core.windows.net",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);

    try {
      await containerClient.create();
      await containerClient.delete();
    } catch (err) {
      assert.deepStrictEqual(
        err.message.includes("Server failed to authenticate the request."),
        true
      );
      assert.deepStrictEqual(
        err.details.AuthenticationErrorDetail.includes("issuer"),
        true
      );
      return;
    }
    assert.fail();
  });

  it(`Should not work with invalid nbf @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2119/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://devstoreaccount1.blob.core.windows.net",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);

    try {
      await containerClient.create();
      await containerClient.delete();
    } catch (err) {
      assert.deepStrictEqual(
        err.message.includes("Server failed to authenticate the request."),
        true
      );
      assert.deepStrictEqual(
        err.details.AuthenticationErrorDetail.includes("Lifetime"),
        true
      );
      return;
    }
    assert.fail();
  });

  it(`Should not work with invalid exp @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://devstoreaccount1.blob.core.windows.net",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);

    try {
      await containerClient.create();
      await containerClient.delete();
    } catch (err) {
      assert.deepStrictEqual(
        err.message.includes("Server failed to authenticate the request."),
        true
      );
      assert.deepStrictEqual(
        err.details.AuthenticationErrorDetail.includes("expire"),
        true
      );
      return;
    }
    assert.fail();
  });

  it(`Should not work with get container ACL @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://devstoreaccount1.blob.core.windows.net",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);
    await containerClient.create();

    try {
      await containerClient.getAccessPolicy();
    } catch (err) {
      assert.deepStrictEqual(
        err.message.includes("Server failed to authenticate the request."),
        true
      );
      await containerClient.delete();
      return;
    }
    await containerClient.delete();
    assert.fail();
  });

  it(`Should not work with set container ACL @loki @sql`, async () => {
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://devstoreaccount1.blob.core.windows.net",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);
    await containerClient.create();

    try {
      await containerClient.setAccessPolicy("filesystem");
    } catch (err) {
      assert.deepStrictEqual(
        err.message.includes("Server failed to authenticate the request."),
        true
      );
      await containerClient.delete();
      return;
    }
    await containerClient.delete();
    assert.fail();
  });

  it("Create container with not exist Account, return 404 @loki @sql", async () => {
    const accountNameNotExist = "devstoreaccountnotexist";
    const baseURL = `https://${server.config.host}:${server.config.port}/${accountNameNotExist}`;
    const containerName: string = getUniqueName("1container-with-dash");

    // Shared key
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountNameNotExist,
      EMULATOR_ACCOUNT_KEY
    );
    let serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(sharedKeyCredential, {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );
    let containerClientNotExist =
      serviceClient.getFileSystemClient(containerName);
    try {
      await containerClientNotExist.create();
    } catch (err) {
      if (err.statusCode !== 404 && err.code !== "ResourceNotFound") {
        assert.fail(
          "Create queue with shared key not fail as expected." + err.toString()
        );
      }
    }

    // Oauth
    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2100/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://storage.azure.com",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    serviceClient = new DataLakeServiceClient(
      baseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );
    containerClientNotExist = serviceClient.getFileSystemClient(containerName);
    try {
      await containerClientNotExist.create();
    } catch (err) {
      if (err.statusCode !== 404 && err.code !== "ResourceNotFound") {
        assert.fail(
          "Create queue with oauth not fail as expected." + err.toString()
        );
      }
    }
    // Account SAS
    const now = new Date();
    now.setMinutes(now.getMinutes() - 5);
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential
    ).toString();
    let sasURL = `${serviceClient.url}?${sas}`;
    serviceClient = new DataLakeServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential(), {
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );
    containerClientNotExist = serviceClient.getFileSystemClient(containerName);
    try {
      await containerClientNotExist.create();
    } catch (err) {
      if (err.statusCode !== 404 && err.code !== "ResourceNotFound") {
        assert.fail(
          "Create queue with account sas not fail as expected." + err.toString()
        );
      }
    }

    // Service SAS
    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: containerName,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential
    );
    sasURL = `${serviceClient.url}?${containerSAS}`;
    serviceClient = new DataLakeServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential(), {
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );
    containerClientNotExist = serviceClient.getFileSystemClient(containerName);
    try {
      await containerClientNotExist.create();
    } catch (err) {
      if (err.statusCode !== 404 && err.code !== "ResourceNotFound") {
        assert.fail(
          "Create queue with service sas not fail as expected." + err.toString()
        );
      }
    }
  });

  it(`Should not work with HTTP @loki @sql`, async () => {
    await server.close();
    await server.clean();

    server = factory.createServer(false, false, false, "basic");
    await server.start();

    const httpBaseURL = `http://${server.config.host}:${server.config.port}/devstoreaccount1`;

    const token = generateJWTToken(
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      new Date("2019/01/01"),
      "https://sts.windows-ppe.net/ab1f708d-50f6-404c-a006-d71b2ac7a606/",
      "https://devstoreaccount1.blob.core.windows.net",
      "user_impersonation",
      "23657296-5cd5-45b0-a809-d972a7f4dfe1",
      "dd0d0df1-06c3-436c-8034-4b9a153097ce"
    );

    const serviceClient = new DataLakeServiceClient(
      httpBaseURL,
      newPipeline(new SimpleTokenCredential(token), {
        retryOptions: { maxTries: 1 },
        // Make sure socket is closed once the operation is done.
        keepAliveOptions: { enable: false }
      })
    );

    const containerName: string = getUniqueName("1container-with-dash");
    const containerClient = serviceClient.getFileSystemClient(containerName);

    try {
      await containerClient.create();
      await containerClient.delete();
    } catch (err) {
      assert.deepStrictEqual(
        err.message.includes("Bearer token authentication is not permitted"),
        true
      );
      assert.deepStrictEqual(err.message.includes("non-https"), true);
      return;
    }
    assert.fail();
  });
});
