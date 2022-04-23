# useAxios

useAxios, for CREATE, UPDATE, DELETE, and useAxiosGet to read data form a rest API, stores it in the cache.

All error handling, and a status for pending, error idle, and success with the REST API.

### **install**

```bash
npm i @sjblurton/use-axios

yarn add @sjblurton/use-axios
```

### Import useAxios

```bash
import { useAxiosGet, useAxios }from "@sjblurton/use-axios-get";
```

### **To call the hooks...**

```bash
const [status, response, error, setAPICall] = useAxios<RequestData, ServerResponseData>();
const [status, data, error, mutate] = useAxiosGet<Data>('url')

```

### **status**

returns a string of 'idle', 'pending', 'error', or 'success'

### **response**

returns an AxiosResponse or undefined if not responded.

### **error**

returns an AxiosError response or undefined if no error

### **data**

returns the response data or undefined

### **setAxiosReq**

takes one AxiosRequestConfig object with two values required, the url string and method as a string. plus all the optional ones, refer to the Axios docs here: https://axios-http.com/docs/req_config

```bash
setAxiosReq({
              method: 'DELETE',
              url: '/user/2',
          })
```

### **useAxiosGet**

```bash
function App() {
  const [todosStatus, todos, todosError, todosMutate] = useAxiosGet<MockData>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (status === "pending") return <div>loading...</div>;
  if (status === "error") return <div>{error?.message}</div>;

  return (
    <div className="App">
      {todos?.map((todo) => (
        <h2>{todo.title}</h2>
      ))}
      <button onClick={mutate}>Mutate</button>
    </div>
  );
}
```

### **Links**

GitHub: https://github.com/sjblurton/use-axios-get
<br/>
NPM: https://www.npmjs.com/package/@sjblurton/use-axios-get
