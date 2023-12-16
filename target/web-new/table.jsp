<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>


<% List<Map<String, String>> results = (List<Map<String, String>>) application.getAttribute("results");
    if (results != null) {
        for (Map<String, String> result : results) {
%>
<tr>
    <td><%= result.get("x") %></td>
    <td><%= result.get("y") %></td>
    <td><%= result.get("r") %></td>
    <td><%= result.get("area") %></td>
    <td><%= result.get("time") + " ms" %></td>
</tr>
<% } } %>