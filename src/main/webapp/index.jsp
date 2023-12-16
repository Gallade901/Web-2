<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab-2</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <table border="1">
        <thead>
            <tr>
                <th colspan="2">
                    Chernomorov Kirill P3209
                    <br>
                    Variant: 95727
                    <hr>
                    <br>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <canvas class="areas" id="graph"></canvas>

                    <form method="post" id="inpform" class="validate_form">
                        <p> <b>Enter X</b> </p>
                        <p>
                            <input name="x" type="radio" value="-2"> -2
                            <input name="x" type="radio" value="-1.5"> -1.5
                            <input name="x" type="radio" value="-1"> -1
                            <input name="x" type="radio" value="-0.5"> -0.5
                            <input name="x" type="radio" value="0" checked> 0
                            <input name="x" type="radio" value="0.5"> 0.5
                            <input name="x" type="radio" value="1"> 1
                            <input name="x" type="radio" value="1.5"> 1.5
                            <input name="x" type="radio" value="2"> 2
                        </p>
                        <br>
                        <p> <label for="input-y"><b>Enter Y:</b></label>
                            <input id="input-y" name="y" value="0" type="text" placeholder="(-3; 5)" required>
                        </p>
                        <p> Enter a number from -3 to 5 </p>
                        <br>
                        <p><b>Enter R </b></p>
                        <p>
                            <select name="radius">
                              <option name="r" value="1">1</option>
                              <option name="r" value="2">2</option>
                              <option name="r" value="3">3</option>
                              <option name="r" value="4">4</option>
                              <option name="r" value="5">5</option>
                            </select>
                        </p>
                        <br>
                        <p>
                            <button type="submit" id="submitBtn"> Send </button>
                        </p>
                        <p id="error"></p>
                        <button type="button" id="clearTable"> Clear table </button>
                    </form>
                </td>
                <td>
                    <table id="resultTable">
                        <thead>
                            <tr>
                                <th>X</th>
                                <th>Y</th>
                                <th>R</th>
                                <th>Result</th>
                                <th>Execute time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <jsp:include page="table.jsp"/>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <div id="result"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.2.1/decimal.min.js"></script>
    <script src="js/graf.js"></script>
</body>
</html>
