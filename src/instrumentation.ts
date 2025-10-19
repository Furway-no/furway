import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import {
  ATTR_DEPLOYMENT_ENVIRONMENT_NAME,
  ATTR_SERVICE_INSTANCE_ID,
  ATTR_SERVICE_NAMESPACE,
} from "@opentelemetry/semantic-conventions/incubating";
import { OTLPHttpJsonTraceExporter, registerOTel } from "@vercel/otel";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

export function register() {
  registerOTel({
    attributes: {
      [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: process.env.NODE_ENV || "development",
      [ATTR_SERVICE_INSTANCE_ID]:
        process.env.OTEL_SERVICE_INSTANCE_ID || `id-${Math.random().toString(36).slice(2, 10)}`,
      [ATTR_SERVICE_NAMESPACE]: process.env.OTEL_SERVICE_NAMESPACE || "furway.no",
      [ATTR_SERVICE_VERSION]: process.env.npm_package_version || "unknown",
    },
    serviceName: process.env.OTEL_SERVICE_NAME || process.env.npm_package_name || "unknown",
    traceExporter: new OTLPHttpJsonTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || "http://localhost:4318/v1/traces",
    }),
  });
}
