import Routes from "./Routes"

function App() {
  console.log('App');
  const token = JSON.parse(localStorage.getItem('token'))
  const userId = JSON.parse(localStorage.getItem('userId'))
  console.log(token, userId);

  return (
    <>
      <Routes />
    </>
  )
}

export default App
