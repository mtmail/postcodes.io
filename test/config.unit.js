"use strict";

const { configFactory } = require("./helper");
const { assert } = require("chai");

describe("Config", () => {
  describe("Environment variables", () => {
    const ENV = process.env;

    beforeEach(() => {
      process.env = {};
    });

    after(() => {
      process.env = ENV;
    });

    describe("SERVE_STATIC_ASSET", () => {
      it("enables serveStaticAssets", () => {
        process.env["SERVE_STATIC_ASSETS"] = "true";
        assert.isTrue(configFactory().serveStaticAssets);
      });

      it("disables serveStaticAssets", () => {
        process.env["SERVE_STATIC_ASSETS"] = "false";
        assert.isFalse(configFactory().serveStaticAssets);
      });

      it("defaults to true for unknown input", () => {
        process.env["SERVE_STATIC_ASSETS"] = "foo";
        assert.isTrue(configFactory().serveStaticAssets);
      });
    });

    describe("HTTP_HEADERS", () => {
      it("is undefined by default", () => {
        assert.isUndefined(configFactory().httpHeaders);
      });

      it("assigns httpHeaders", () => {
        const headers = {
          foo: "bar",
          baz: "quux",
        };
        process.env["HTTP_HEADERS"] = JSON.stringify(headers);
        assert.deepEqual(configFactory().httpHeaders, headers);
      });

      it("throws if invalid httpHeader string", () => {
        process.env["HTTP_HEADERS"] = "foo";
        assert.throws(configFactory);
      });
    });

    describe("EAGER_LOAD_IDS", () => {
      it ("sets eagerLoadId true if configured", () => {
        process.env["EAGER_LOAD_IDS"] = "1";
        assert.isTrue(configFactory().eagerLoadIds);
      });
      it ("sets eagerLoadId false if set to 'false'", () => {
        process.env["EAGER_LOAD_IDS"] = "false";
        assert.isFalse(configFactory().eagerLoadIds);
      });
      it ("sets eagerLoadId false if not configured", () => {
        assert.isFalse(configFactory().eagerLoadIds);
      });
    });
  });
});
