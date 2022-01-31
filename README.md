# MakerEnhance

React component for [Maker](https://maker.me) Enhance.

## Installation

`yarn add maker-enhance`

or

`npm install --save maker-enhance`

## Usage

```javascript
import MakerEnhance from "maker-enhance";

<MakerEnhance user={yourMakerUserIdOrSlug} />;
```

## Example

```javascript
import React from "react";
import MakerEnhance from "maker-enhance";

class App extends React.Component {
  render() {
    return (
      <div>
        <MakerEnhance user="user" index="1" />
        <MakerEnhance user="user" index="2" loadingHeight={400} />
      </div>
    );
  }
}
```

## Props

- **user** (required) - _string_ - Your [Maker](https://maker.me) user id or slug
- **index** - _string or number_ - If you want to render multiple MakerEnhance components on one page, add a unique **index** prop to each and every one of them so Maker can keep track of multiple instances
- **loadingHeight** - _number_ - While Maker is loading, it doesn't know the final height of the content. To prevent Cumulative Layout Shift (CLS), Maker iframe blocks a height of 1000px during the loading and then adjusts to actual content height. If you know that your content height is static and will never be heigher than a certain value (let's say 400px), you can use **loadingHeight** to override this default 1000px height.
