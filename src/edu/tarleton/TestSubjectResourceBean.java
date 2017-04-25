package edu.tarleton;

import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/subject")
public class TestSubjectResourceBean {
    public String rootFolderPath =  "C:\\tmp\\course-project\\testsubjectdata\\";
    
    // Returns a subjects data from file
    @GET
    @Path("{subject_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public TestSubject getSubject(@PathParam("subject_id") String id) throws Exception {
        TestSubject subject;
        subject  = Utility.<TestSubject>readObjectFromFile(rootFolderPath + id + ".dat");
        return subject;
    }
    
    @GET
    @Path("/names")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getSubjectNames() throws Exception {
        ArrayList<String> names = new ArrayList<>();
        
        File folder = new File(rootFolderPath);
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
    
    @GET
    @Path("/weekly")
    @Produces(MediaType.TEXT_PLAIN)
    public String getWeeklies() throws Exception {
        return "failed";
    }
    
    @POST
    @Path("/weekly/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateWeeklyRecords(@Valid List<Weekly> records) throws Exception {
        if(records == null || records.size() < 1){
            return Response.status(201).entity("failed").build();
        }
        
        for(Weekly record : records){
            System.out.println(record.id + " " + record.name);
        }
        System.out.println("Updating record");
        return Response.status(200).entity("success").build();
    }
    
    @GET
    @Path("/daily")
    @Produces(MediaType.TEXT_PLAIN)
    public String getDailies() throws Exception {
        return "failed";
    }
    
    @POST
    @Path("/daily/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateDailyRecords(@Valid List<TestSubject> records) throws Exception {
        if(records == null || records.size() < 1){
            return Response.status(201).entity("failed").build();
        }
        
        for(TestSubject record : records){
            System.out.println("Updating record");
            System.out.println(record.id + " " + record.name);
        }
        
        return Response.status(200).entity("success").build();
    }
}
