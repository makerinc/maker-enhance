import React from "react";
import PropTypes from "prop-types";

export default class MakerEnhance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: window.location.href
    };
  }

  componentDidMount() {
    this.addScript();
  }

  componentDidUpdate(prevProps) {
    let urlUpdated = false;

    if (window.location.href !== this.state.url) {
      this.updateUrl();
      urlUpdated = true;
    }

    if (this.props.index !== prevProps.index || urlUpdated) {
      this.run();
    }
  }

  updateUrl() {
    this.setState({
      url: window.location.href
    });
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

MakerEnhance.propTypes = {
  user: PropTypes.string.isRequired
};
