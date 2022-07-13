const puppeteer = require("puppeteer");

const scriptUrlPatterns = [
  "https://auth.staging.mymojohealth.com/api/v1/shopify/products",
];

async function interceptRequestsForPage(page) {
  const client = await page.target().createCDPSession();

  await client.send("Network.enable");

  await client.send("Network.setRequestInterception", {
    patterns: scriptUrlPatterns.map((pattern) => ({
      urlPattern: pattern,
      resourceType: "XHR",
      interceptionStage: "Request",
    })),
  });

  client.on(
    "Network.requestIntercepted",
    async ({ interceptionId, request, responseHeaders, resourceType }) => {
      console.log(
        `Intercepted ${request.url} {interception id: ${interceptionId}}`
      );

      console.log(`Continuing interception ${interceptionId}`);
      client.send("Network.continueInterceptedRequest", {
        interceptionId,
        url: "https://auth.us.mymojohealth.com/api/v1/shopify/products",
      });
    }
  );
}

(async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
    args: ["--window-size=1920,1170", "--window-position=0,0"],
  });

  const page = (await browser.pages())[0];

  await interceptRequestsForPage(page);
})();
