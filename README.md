# MakerEnhance

React component for [Maker](https://www.maker.co) Enhance.

## Installation

`yarn add maker-enhance`

or

`npm install --save maker-enhance`

## Usage

```typescript
import MakerEnhance from "maker-enhance";

<MakerEnhance user={yourMakerUserIdOrSlug} />;
```

## Example

```typescript
import React from "react";
import MakerEnhance from "maker-enhance";

export default function Page() {
  return (
    <div>
      <MakerEnhance user="user" instanceId="header" />
      <MakerEnhance user="user" instanceId="page" loadingHeight={400} />
    </div>
  );
}
```

## Props

- **user** (required) - _string_ - Your [Maker](https://maker.me) user id or slug
- **instanceId** - _string_ - If you want to render multiple MakerEnhance components on one page, add a unique **instanceId** prop to each and every one of them so Maker can keep track of multiple instances
- **loadingHeight** - _number_ - While Maker is loading, it doesn't know the final height of the content. To prevent Cumulative Layout Shift (CLS), Maker iframe blocks a height of 1000px during the loading and then adjusts to actual content height. If you know that your content height is static and will never be heigher than a certain value (let's say 400px), you can use **loadingHeight** to override this default 1000px height.
