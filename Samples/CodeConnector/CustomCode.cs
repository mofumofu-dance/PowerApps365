public class Script : ScriptBase
{
    public override async Task<HttpResponseMessage> ExecuteAsync()
    {
        var contentAsString = await this.Context.Request.Content.ReadAsStringAsync().ConfigureAwait(false);
        var stringJArray = JArray.Parse(contentAsString);
        var doubleArray = stringJArray.ToObject<List<float>>();
        float ave = doubleArray.Average();
        float sum = doubleArray.Sum();
        HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
        response.Content = CreateJsonContent("{\"average\": "+ave+",\"sum\":"+sum+"}");
        return response;
    }
}
