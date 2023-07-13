import React from "react";
import PropTypes from "prop-types";

function isBrowser() {
  return typeof window !== "undefined";
}

export default class MakerEnhance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: isBrowser() && window.location.href
    };
  }

  componentDidMount() {
    this.addScript();
  }

  componentDidUpdate(prevProps) {
    let urlUpdated = false;

    if (isBrowser() && window.location.href !== this.state.url) {
      this.updateUrl();
      urlUpdated = true;
    }

    if (this.props.index !== prevProps.index || urlUpdated) {
      this.run();
    }
  }

  updateUrl() {
    this.setState({
      url: isBrowser() && window.location.href
    });
  }

  addScript() {
    if (!isBrowser() || !this.props.user || window.MakerEmbeds) {
      return this.run();
    }

    const script = document.createElement("script");
    script.id = "maker-enhance-script";
    script.src = this.script;
    script.async = true;
    document.head.appendChild(script);
  }

  get script() {
    return `https://app.maker.co/enhance/${this.props.user}.js`;
  }

  run() {
    if (!isBrowser() || typeof (window.MakerEmbeds || {}).run !== "function") {
      return;
    }

    window.MakerEmbeds.run();
  }

  render() {
    const index = this.props.index || 0;
    const html = `
      <script src="${
        this.script
      }" id="maker-enhance-script" async="true"></script>
      <div
        id="js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-${index}"
        class="js-maker-enhance-static-mount"
        style="height:auto;width:100%"
        ${
          this.props.loadingHeight
            ? `data-loading-height="${this.props.loadingHeight}"`
            : ""
        }
      />
    `;

    // https://github.com/facebook/react/issues/10923#issuecomment-338715787
    // "We won't try to manipulate the tree of a dangerouslySetInnerHTML node on the client. Even if it is wrong."
    //
    // Use dangerouslySetInnerHTML to avoid issues with hydration.
    return (
      <div
        className="js-maker-enhance-wrapper"
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning={true}
      />
    );
  }
}

MakerEnhance.propTypes = {
  user: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loadingHeight: PropTypes.number
};
