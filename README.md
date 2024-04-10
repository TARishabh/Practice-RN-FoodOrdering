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


To integrate stripe with supabase:

also run the command, npx supabase functions serve --env-file .env payment-sheet

1. Understand the diagram from notion/just-not-dev of stripe intent.
2. run command npx supbase functions new "payment-name", this will call the api from stripe from payment intent.
3. now use that curl command in supabase -> functions -> index.ts, hit it to check if it is returning the response.
4. now we have to make a function which connects to our stripe account.
5. now install react-native-stripe provider and wrap the whole providers inside stripe provider.
6. now i created a file stripe.ts in lib folder, and created the function initializePaymentSheet, which is called when user presses checkout.
7. now i created fetchPaymentSheetParams function.
8. now i created openpaymentsheet.