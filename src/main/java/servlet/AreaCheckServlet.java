package servlet;



import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.math.BigDecimal;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.*;


@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.nanoTime();
        ServletContext servletContext = request.getServletContext();
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");
        BigDecimal xd = new BigDecimal(x);
        BigDecimal yd = new BigDecimal(y);
        BigDecimal rd = new BigDecimal(r);
        boolean area = false;
//        if ((xd >= -rd && yd <= rd / 2 && xd <= 0 && yd >= 0) ||
//                (((rd / 2) * (rd / 2) >= xd * xd + yd * yd) && (xd >= 0 && yd <= 0) ) ||
//                (yd <= (-xd / 2 + rd / 2) && xd >= 0 && yd >= 0)) {
//            area = true;
//        }
        if ((xd.compareTo(rd.negate()) >= 0 && yd.compareTo(new BigDecimal(0)) >= 0 && xd.compareTo(new BigDecimal(0)) <= 0 && yd.compareTo(rd.divide(new BigDecimal(2))) <= 0) ||
                (((rd.divide(new BigDecimal(2))).pow(2).compareTo(xd.pow(2).add(yd.pow(2))) >= 0) && (xd.compareTo(new BigDecimal(0)) >= 0 && yd.compareTo(new BigDecimal(0)) <= 0)) ||
                (yd.compareTo(xd.negate().divide(new BigDecimal(2)).add(rd.divide(new BigDecimal(2)))) <= 0 && xd.compareTo(new BigDecimal(0)) >= 0 && yd.compareTo(new BigDecimal(0)) >= 0)) {
            area = true;
        }
        String areaHit = area ? "+" : "-";
        DecimalFormat df = new DecimalFormat("0.0000", new DecimalFormatSymbols(Locale.US));
        Map<String, String> result = new HashMap<>();
        String xs = df.format(xd);
        String ys = df.format(yd);
        String executionTime = String.format("%.5f",(Double)((System.nanoTime() - startTime)/1_000_000.0));
        result.put("x", xs);
        result.put("y", ys);
        result.put("r", r);
        result.put("area", areaHit);
        result.put("time", executionTime);
        servletContext.setAttribute("x", xs);
        servletContext.setAttribute("y", ys);
        servletContext.setAttribute("r", r);
        servletContext.setAttribute("area", areaHit);
        servletContext.setAttribute("time", executionTime);
        List<Map<String, String>> results = (List<Map<String, String>>) servletContext.getAttribute("results");
        if (results == null) {
            results = new ArrayList<>();
            servletContext.setAttribute("results", results);
        }
        results.add(result);
        getServletContext().getRequestDispatcher("/result_page.jsp").forward(request, response);

    }
}