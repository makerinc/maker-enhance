import React from "react";
import renderer from "react-test-renderer";
import MakerEnhance from "../src/MakerEnhance";

let mocks = {};

beforeEach(() => {
  document.head.innerHTML = "";
});

afterEach(() => {
  Object.keys(mocks).forEach(key => {
    mocks[key].mockRestore();
  });

  mocks = {};
});

test("MakerEnhance renders div with default index", () => {
  const component = renderer.create(<MakerEnhance user="linkesch" />);
  const tree = component.toJSON();
  const scripts = document.querySelectorAll("#maker-enhance-script");

  expect(tree).toMatchSnapshot();
  expect(scripts.length).toBe(1);
  expect(scripts[0].src).toBe("https://app.maker.co/enhance/linkesch.js");
});

test("MakerEnhance renders div with provided index", () => {
  const component = renderer.create(<MakerEnhance user="linkesch" index="2" />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("MakerEnhance should not add script if user prop is not provided", () => {
  mocks = {
    error: jest.spyOn(window.console, "error").mockImplementation(() => null)
  };

  const component = renderer.create(<MakerEnhance />);
  const tree = component.toJSON();
  const scripts = document.head.querySelectorAll("#maker-enhance-script");

  expect(tree).toMatchSnapshot();
  expect(scripts.length).toBe(0);
});

test("MakerEnhance should call run() function on props update", () => {
  window.MakerEmbeds = {
    run: jest.fn()
  };

  const component = renderer.create(<MakerEnhance user="linkesch" />);
  component.update(<MakerEnhance user="linkesch" index={1} />);

  expect(window.MakerEmbeds.run).toHaveBeenCalled();
});

test("MakerEnhance should call run() function on update when also url changes", () => {
  window.MakerEmbeds = {
    run: jest.fn()
  };

  const component = renderer.create(<MakerEnhance user="linkesch" />);
  window.location.href = "#test";

  component.update(<MakerEnhance user="linkesch" />);

  expect(window.MakerEmbeds.run).toHaveBeenCalled();
});

test("MakerEnhance should not call run() function on useless update", () => {
  window.MakerEmbeds = {
    run: jest.fn()
  };

  const component = renderer.create(<MakerEnhance user="linkesch" />);
  component.update(<MakerEnhance user="linkesch" />);

  expect(window.MakerEmbeds.run).toHaveBeenCalledTimes(1);
});

test("MakerEnhance should support loadingHeight prop", () => {
  const component = renderer.create(
    <MakerEnhance user="linkesch" loadingHeight={100} />
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
