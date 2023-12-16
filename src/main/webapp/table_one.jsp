<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>

<tr>
    <td><%= application.getAttribute("x") %></td>
    <td><%= application.getAttribute("y") %></td>
    <td><%= application.getAttribute("r") %></td>
    <td><%= application.getAttribute("area") %></td>
    <td><%= application.getAttribute("time") + " ms" %></td>
</tr>
