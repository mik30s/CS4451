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
	public final String FAILED = "Failed";
	public final String SUCCESS = "Success";
    public String rootFolderPath =  "C:\\tmp\\course-project\\testsubjectdata\\";
    
    public class ResponseObject {
    	public String status;
    	public String reason;
    	
    	public ResponseObject(){}
    	public ResponseObject(String status, String reason){
    		this.status = status;
    		this.reason = reason;
    	}
    };
    
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
    @Path("/stzinductions")
    @Produces(MediaType.TEXT_PLAIN)
    public String getSTZInductions() throws Exception {
        return "failed";
    }
    
    @POST
    @Path("/stzinductions/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateSTZInductionRecords(@Valid List<STZInduction> records) throws Exception {
    	ResponseObject resp = new ResponseObject();
        String retval = FAILED;
    	if(records == null || records.size() < 1){
            return Response.status(201).entity(setResponseMessage(resp, retval)).build();
        }
        
        for(STZInduction record : records){
            System.out.println("Updating weekly record");
        	System.out.println(record.id + " " + record.name);
            retval = validateFields(record) ? SUCCESS : FAILED ;
        }
    
        return Response.status(200).entity(setResponseMessage(resp, retval)).build();
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateWeeklyRecords(@Valid List<Weekly> records) throws Exception {
    	ResponseObject resp = new ResponseObject();
        String retval = FAILED;
    	if(records == null || records.size() < 1){
            return Response.status(201).entity(setResponseMessage(resp, retval)).build();
        }
        
        for(Weekly record : records){
            System.out.println("Updating weekly record");
        	System.out.println(record.id + " " + record.name);
            retval = validateFields(record) ? SUCCESS : FAILED ;
        }
    
        return Response.status(200).entity(setResponseMessage(resp, retval)).build();
    }
    
    @GET
    @Path("/daily")
    @Produces(MediaType.TEXT_PLAIN)
    public String getDailies() throws Exception {
        return "failed";
    }
    
    @POST
    @Path("/daily/delete")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteDailyRecords() throws Exception {
    	return Response.status(200).entity(
    						new ResponseObject(SUCCESS, " Deleted entries for today"
    						)).build();
    }
    
    @POST
    @Path("/weekly/delete")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteWeeklyRecords() throws Exception {
    	return Response.status(200).entity(
    						new ResponseObject(SUCCESS, " Deleted entries for today")).build();
    }
    
    @POST
    @Path("/stz/delete")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteStzRecords() throws Exception {
    	return Response.status(200).entity(
    						new ResponseObject(SUCCESS, " Deleted entries for today"
    						)).build();
    }
    
    @POST
    @Path("/daily/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateDailyRecords(@Valid List<TestSubject> records) throws Exception {
    	ResponseObject resp = new ResponseObject();
    	String retval = FAILED;
        if(records == null || records.size() < 1){
            return Response.status(500).entity(setResponseMessage(resp, retval)).build();
        }
        
        for(TestSubject record : records) {
            System.out.println("Updating daily record");
            System.out.println(record.id + " " + record.name);
            retval = validateFields(record.getDailyAM()) ? SUCCESS : FAILED ;
            retval = validateFields(record.getDailyPM()) ? SUCCESS : FAILED ;
        }
             
        return Response.status(200).entity(setResponseMessage(resp, retval)).build();
    }
    
    
    
    public boolean validateFields(Weekly weekly){
    	boolean isValid = false;
    	
    	if(weekly != null) {
    		if ((weekly.IOP >= 5.0f && weekly.IOP <= 65.0f) && 
    			(weekly.weight >= 0 && weekly.weight <= 100)) 
    		{
    			System.out.println("fields are valid.");
    			isValid = true;
    		}
    		else {
    			System.out.println("fields are not valid.");
    		}
    	}
    	
    	return  isValid;
    }
    
    public boolean validateFields(STZInduction induction){
    	boolean isValid = false;
    	
    	if(induction != null) {
    		if ((induction.salineAmount >= 10.0f && induction.salineAmount <= 100.0f) && 
    			(induction.STZAdministered >= 1200.0f && induction.STZAdministered <= 1900.0f)) 
    		{
    			System.out.println("fields are valid.");
    			isValid = true;
    		}
    		else {
    			System.out.println("fields are not valid.");
    		}
    	}
    	
    	return  isValid;
    }
    
    public boolean validateFields(Daily daily){
    	boolean isvalid = false;
    	
    	if(daily != null) {
    		if((daily.getFeedEaten() >= 0 && daily.getFeedEaten() <= 50)
    		    && (daily.getFeedRefused() >= 0 && daily.getFeedRefused() <= 50)
    		    && (daily.getBloodGlucoseLevelPerMeal() >= 25 && daily.getBloodGlucoseLevelPerMeal() <= 500)
    		    && (daily.getBloodGlucoseLevelPerMeal() >= 25 && daily.getBloodGlucoseLevelPerMeal() <= 500)
    		    && (daily.getInsulinAdministered() >= 0 && daily.getInsulinAdministered() <= 5))
    		{
    			System.out.println("fields are valid.");
    			isvalid = true;
    		}
    		else {
    			System.out.println("fields are not valid.");
    		}
    	}
    	
    	return isvalid;
    }
    
    public ResponseObject setResponseMessage(ResponseObject resp, String status){
    	 resp.status = status;
    	 if(status != SUCCESS) {resp.reason = "One or more fields are not valid! Operation failed.";}
         else {resp.reason = "All fields were valid! Operation successful.";}
    	 return resp;
    }
}
