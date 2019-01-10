import React from "react";
import renderer from "react-test-renderer";
import MakerEnhance from "../src/index";

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
  let tree = component.toJSON(),
    scripts = document.head.querySelectorAll("#maker-enhance-script");

  expect(tree).toMatchSnapshot();
  expect(scripts.length).toBe(1);
  expect(scripts[0].src).toBe("https://app.maker.co/enhance/linkesch.js");
});

test("MakerEnhance renders div with provided index", () => {
  const component = renderer.create(<MakerEnhance user="linkesch" index="2" />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("MakerEnhance should not add script if user prop is not provided", () => {
  let component, tree, scripts;

  mocks = {
    error: jest.spyOn(window.console, "error").mockImplementation(() => null)
  };

  component = renderer.create(<MakerEnhance />);
  tree = component.toJSON();
  scripts = document.head.querySelectorAll("#maker-enhance-script");

  expect(tree).toMatchSnapshot();
  expect(scripts.length).toBe(0);
});

test("MakerEnhance should call run() function on update", () => {
  let component, tree, scripts;

  window.MakerEmbeds = {
    run: jest.fn()
  };

  mocks = {
    run: jest.spyOn(window.MakerEmbeds, "run").mockImplementation(() => null)
  };

  component = renderer.create(<MakerEnhance user="linkesch" />);
  tree = component.toJSON();
  component.update(<MakerEnhance user="linkesch" />);

  expect(window.MakerEmbeds.run).toHaveBeenCalled();
});
