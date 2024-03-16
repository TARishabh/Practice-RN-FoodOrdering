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