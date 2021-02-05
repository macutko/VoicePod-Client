# File structure

## api/
api calls - one per file
## assets/
assets
## components/
building blocks
### atoms/
basic reusable agnostic components
Is this universally reusable? Will it be reused in different settings? 

### molecules/
specific components that most probably are not agnostic to what environment they are in
Is this a specific self contained building block for a particular organism?

### organisms/ 
bigger state components handling multiple molecules
Does this handle a state/API? Is it the next big component of a screen? 

## screens/
 components part of the TabNav or MainNav. Comprised of organisms and molecules.
 Is this component part of MainNav or TabNav? 
  
## navigation/
all navigators located in the app
## utilities/
small reusable functions
