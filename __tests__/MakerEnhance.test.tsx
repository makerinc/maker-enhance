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

test("MakerEnhance should support loadingHeight prop", async () => {
  await renderer.act(async () => {
    component = renderer.create(
      <MakerEnhance user="linkesch" loadingHeight={100} />,
    );
  });
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
