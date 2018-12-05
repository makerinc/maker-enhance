import React from "react";
import PropTypes from "prop-types";

export default class MakerEnahance extends React.Component {
  componentDidMount() {
    this.addScript();
  }

  componentDidUpdate() {
    this.run();
  }

  addScript() {
    let script = document.querySelector("#maker-enhance-script");

    if (script || !this.props.user) {
      return this.run();
    }

    script = document.createElement("script");
    script.id = "maker-enhance-script";
    script.src = `https://app.maker.co/enhance/${this.props.user}.js`;
    document.head.appendChild(script);
  }

  run() {
    if (typeof (window.MakerEmbeds || {}).run !== "function") {
      return;
    }

    window.MakerEmbeds.run();
  }

  render() {
    const index = this.props.index || 0;

    return (
      <div className="js-maker-enhance-wrapper">
        <div
          id={`js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-${index}`}
          className="js-maker-enhance-static-mount"
          style={{ height: "auto", width: "100%" }}
        />
      </div>
    );
  }
}

MakerEnahance.propTypes = {
  user: PropTypes.string.isRequired
};
