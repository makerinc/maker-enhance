import React from "react";
//@ts-ignore
import renderer from "react-test-renderer";
import MakerEnhance from "../src/MakerEnhance";

declare global {
  interface Window {
    MakerEmbeds:
      | {
          run: () => void;
        }
      | undefined;
  }
}

let mocks: { [key: string]: jest.SpyInstance } = {};
let component: renderer.ReactTestRenderer;

beforeEach(() => {
  document.head.innerHTML = "";
});

afterEach(() => {
  if (window.MakerEmbeds && (window.MakerEmbeds.run as jest.Mock)) {
    (window.MakerEmbeds.run as jest.Mock).mockClear();
  }

  Object.keys(mocks).forEach((key) => {
    mocks[key].mockRestore();
  });

  mocks = {};
  window.maker_enhance_engine = undefined;
  component.unmount();
});

test("MakerEnhance renders div with default index", async () => {
  await renderer.act(async () => {
    component = renderer.create(<MakerEnhance user="linkesch" />);
  });
  const tree = component.toJSON();
  const scripts = document.querySelectorAll("#maker-enhance-script");

  expect(tree).toMatchSnapshot();
  expect(scripts.length).toBe(1);
  expect(scripts[0].getAttribute("src")).toBe(
    "https://app.maker.co/enhance/linkesch.js",
  );
});

test("MakerEnhance renders div with provided index", async () => {
  await renderer.act(async () => {
    component = renderer.create(
      <MakerEnhance user="linkesch" instanceId="2" />,
    );
  });
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("MakerEnhance should call run() function on props update", async () => {
  window.MakerEmbeds = {
    run: jest.fn(),
  };

  await renderer.act(async () => {
    component = renderer.create(<MakerEnhance user="linkesch" />);
  });
  await renderer.act(async () => {
    component.update(<MakerEnhance user="linkesch" instanceId={1} />);
  });

  expect(window.MakerEmbeds.run).toHaveBeenCalled();
});

test("MakerEnhance should call run() function on update when also url changes", async () => {
  window.MakerEmbeds = {
    run: jest.fn(),
  };

  await renderer.act(async () => {
    component = renderer.create(<MakerEnhance user="linkesch" />);
  });
  window.location.href = "#test";

  await renderer.act(async () => {
    component.update(<MakerEnhance user="linkesch" />);
  });

  expect(window.MakerEmbeds.run).toHaveBeenCalled();
});

test("MakerEnhance should not call run() function on useless update", async () => {
  window.MakerEmbeds = {
    run: jest.fn(),
  };

  await renderer.act(async () => {
    component = renderer.create(<MakerEnhance user="linkesch" />);
  });
  await renderer.act(async () => {
    component.update(<MakerEnhance user="linkesch" />);
  });

  expect(window.MakerEmbeds.run).toHaveBeenCalledTimes(1);
});

test("MakerEnhance should remove stale embed when URL changes (regression)", async () => {
  jest.useFakeTimers();

  const id =
    "js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-0";
  const initialUrl = window.location.href;
  const oldEmbedId = btoa(encodeURIComponent(initialUrl));

  // Simulate the external script's state — page_url starts matching the current URL
  window.maker_enhance_engine = { page_url: initialUrl };
  window.MakerEmbeds = {
    run: jest.fn(() => {
      // Simulates real behavior: run() reads canonical/location and updates page_url
      window.maker_enhance_engine = { page_url: window.location.href };
    }),
  };

  // Create DOM elements that the component and external script interact with.
  // react-test-renderer doesn't render into the real DOM, so we set these up
  // in document.body where document.querySelector can find them.
  const wrapper = document.createElement("div");
  wrapper.className = "js-maker-enhance-wrapper";
  const placeholder = document.createElement("div");
  placeholder.id = id;
  placeholder.className = "js-maker-enhance-static-mount";
  placeholder.setAttribute("data-maker-loaded", "true");
  wrapper.appendChild(placeholder);

  const embedParent = document.createElement("div");
  const embed = document.createElement("div");
  embed.setAttribute("data-orig-id", id);
  embed.setAttribute("data-maker-embed-id", oldEmbedId);
  embedParent.appendChild(embed);
  wrapper.appendChild(embedParent);

  document.body.appendChild(wrapper);

  await renderer.act(async () => {
    component = renderer.create(<MakerEnhance user="linkesch" />);
  });

  // Clear call count from initial mount
  (window.MakerEmbeds.run as jest.Mock).mockClear();

  // Navigate to new URL (jsdom only supports hash changes)
  window.location.href = "#new-page";

  // Advance timers to trigger the 100ms polling interval
  await renderer.act(async () => {
    jest.advanceTimersByTime(150);
  });

  // run() should have been called at least twice:
  // 1) at start of changeUrl to update page_url
  // 2) after removing stale embed to load new content
  expect(window.MakerEmbeds.run).toHaveBeenCalledTimes(2);

  // Old embed should be removed from DOM
  expect(document.querySelector(`[data-orig-id="${id}"]`)).toBeNull();

  // Placeholder should have data-maker-loaded cleared
  expect(placeholder.getAttribute("data-maker-loaded")).toBeNull();

  document.body.removeChild(wrapper);
  jest.useRealTimers();
});

test("MakerEnhance should support loadingHeight prop", async () => {
  await renderer.act(async () => {
    component = renderer.create(
      <MakerEnhance user="linkesch" loadingHeight={100} />,
    );
  });
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
