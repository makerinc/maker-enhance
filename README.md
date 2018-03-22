# MakerEnhance

React component for [Maker](https://maker.me) Enhance.


## Installation

```yarn add maker-enhance```

or

```npm install --save maker-enhance```


## Usage

```javascript
import MakerEnhance from 'maker-enhance';

<MakerEnhance user={yourMakerUserIdOrSlug} />
```


## Example

```javascript
import React from 'react';
import MakerEnhance from 'maker-enhance';

class App extends React.Component {
  render() {
    return (
      <div>
        <MakerEnhance user="linkesch" index="1" />
        <MakerEnhance user="linkesch" index="2" />
      </div>
    );
  }
}
```


## Props

- **user** (required) - Your [Maker](https://maker.me) user id or slug
- **index** - If you want to render multiple MakerEnhance components on one page, add a unique **index** prop to each and every one of them so Maker can keep track of multiple instances
