<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
    <head>
        <meta charset="UTF-8">
        <title>result</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <br>
        <p align="left"> Check results: </p>
        <br>
        <div id="result">
            <table>
                    <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Result</th>
                    <th>Execute time</th>
                </tr>
                <jsp:include page="table_one.jsp"/>
            </table>
        </div>
        <br>
        <div class="form">
            <form method="get" action="index.jsp">
                <input type="submit" value='Go back'>
            </form>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    </body>
</html>
