//What is HTTP?
//HyperText Transfer Protocol is the protocol used for transferring data on the web. It defines how messages are formatted and transmitted, and how web servers and browsers should respond
//to various commands. When you load a webpage, your browser uses HTTP to request data from a server, which then responds with the required resources like HTML, CSS, images, etc.

//What is a URL?
//A Uniform Resource Locator is the address used to access resources on the internet. It specifies the location of a resource on a server and how to retrieve it. A typical URL includes
//the protocol, the domain, and the path to the specific resource.

//What is DNS?
//Domain Name System is like the phonebook of the internet. It translates human-readable domain names into IP addresses, which are used by computers to locate and communicate with each other
//on the internet. Without DNS users would have to remember and enter IP addresses to access websites.

//What is a query string?
//A query string is a part of a URL that contains data to be passed to web applications. It starts after the ? in a URL and is usually made up of key-value pairs separated by &.


//What are two HTTP verbs and how are they different?
//Two common HTTP verbs are GET and POST.
//GET: Used to request data from a server without modifying any resources. It's typically used to retrieve and display information.
//POST: Used to send data to a server, usually to create or update a resource. The data is included in the body of the request rather than in the URL.

//What is an HTTP request?
//An HTTP request is a message sent by a client to a server, asking for a specific resource. It consists of a method, a URL, headers, and sometimes a body.

//What is an HTTP response?
//An HTTP response is the server's reply to an HTTP request. It includes a status code indicating the result of the request, headers containing metadata.

//What is an HTTP header? Give a couple of examples of request and response headers you have seen.
//An HTTP header is a key-value pair in an HTTP request or response that carries additional information about the request or response.
//User-Agent: Specifies the client's browser and operating system.
//Accept: Indicates the media types the client can handle.
//Content-Type: Specifies the media type of the resource being returned.
//Set-Cookie: Instructs the client to store a cookie.

//What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser?
//DNS Lookup: The browser checks its cache and asks the DNS server to resolve somesite.com to its corresponding IP address.
//TCP/IP Connection: The browser establishes a TCP connection with the server at the IP address using port 80 (for HTTP) or 443 (for HTTPS).
//HTTP Request: The browser sends an HTTP request to the server, asking for the resource /some/page.html.
//Server Processing: The server processes the request, locates the resource, and prepares an HTTP response.
//HTTP Response: The server sends back the response, which includes a status code, headers, and the requested content.
//Rendering: The browser receives the response, processes the HTML, and then requests additional resources referenced in the HTML, repeating the 
//request/response cycle as needed.
//Displaying Content: Finally, the browser renders the page and displays it to the user.

