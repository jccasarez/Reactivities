
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Activities;
using Application.Core;
using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. Services are things we use inside the application (code).

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline. This is referred to as middleware. 
app.UseMiddleware<ExceptionMiddleware>();

//Things that can do something with the HTTP request on it's way in and on it's way out
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    
    var logger = services.GetRequiredService<Logger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}
app.Run();
