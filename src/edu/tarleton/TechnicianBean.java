package edu.tarleton;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/technician")
public class TechnicianBean {
    
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getHello() {
        return "this is a pig";
    }
}
