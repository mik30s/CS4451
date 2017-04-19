package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

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
        subject  = Utility.<TestSubject>readObjectFromFile("C:\\tmp\\course-project\\testsubjectdata\\" + id + ".dat");
        return subject;
    }
    
    @GET
    @Path("names")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getSubjectNames() throws Exception {
        ArrayList<String> names = new ArrayList<>();
        
        File folder = new File("C:/tmp/course-project/testsubjectdata");
        File[] listOfFiles = folder.listFiles();

        for (File file : listOfFiles) {
            TestSubject subject;
            if (file.isFile()) {
                FileInputStream fis = new FileInputStream(file);
                ObjectInputStream oi = new ObjectInputStream(fis);
                subject = (TestSubject)oi.readObject();
                String name = subject.name + "("+subject.id+")";
                names.add(name);
                oi.close();
            }
        }
        
        return names;
    }
}
