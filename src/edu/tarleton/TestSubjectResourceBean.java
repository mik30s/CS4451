package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.ObjectInputStream;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

@Path("/subject")
public class TestSubjectResourceBean {
    
    // Returns a subjects data from file
    @GET
    @Path("{subject_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public TestSubject getSubject(@PathParam("subject_id") String id) throws Exception {
        TestSubject subject;
        subject  = Utilities.<TestSubject>readObjectFromFile("C:/tmp/course-project/testsubjectdata/" + id);
        return subject;
    }
}
