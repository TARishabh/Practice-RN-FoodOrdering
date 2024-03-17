First create a new expo project using:

npx create-expo-app@latest FoodOrdering -t
and then select Navigation (TypeScript)

Now move app, constants, and components folder in a single folder called src

and update all the imports in all the files,

index.tsx
_layout.tsx
+not-found.tsx
two.tsx
Themed.tsx
useColorScheme.web.tsx
EditScreenInfo.tsx
model.tsx

then i started with index.tsx of (tabs) and tried to render a single product on the image

then i created a common component for ProductListItem, and also made a types.ts file and write the type of the product, and created a type ProductListItemProps in the component which tells the type of the product.

"ALIASES PATH OPTIONAL"

Now I started to work with FlatList (it is a infinite scrollable list like instargram feeds), now flatlist take two required params which are data (array of items which you want to display) and a renderitem (a function which displays each item from the array)

now i created a [id].tsx file which maps to individual product details

###
So the main difference between _layout.tsx and index.tsx is,

imagine a page, now all the buttons on top and bottom are shown using _layout.tsx file and all the content in the safeAreaView (in middle) is shown by index.tsx