# gitpoint

Handle your git repositories from your own git server.

gitpoint handle de requests from git client so you can serve your repositoies from the route you choose in your server, just like it was a middelware. If you want Basic authentication support you must implement yourself or install another middlerware to handle it.

## Install

```
npm install --save gitpoint
```

## Usage

The backend repositories must be named follow the name convention {RepoName}.git

```
const gitpoint=require('gitpoint')

// basic usage

let git=gitpoint( path.join(__dirname,"git") )

app.use( '/git', git )


// optional action handlers triggered at push or fetch notice
var handler=(e)=>{
	e.on( 'fetch', ()=>{
		console.log( 'a fetch has done' );
	})
	e.on( 'push', ()=>{
		console.log( 'a push has done' );
	})
}

let git=gitpoint( path.join(__dirname,"git"), handler )

app.use( '/git', git )
```
