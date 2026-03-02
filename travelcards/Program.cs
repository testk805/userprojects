using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker.Configuration;
using Npgsql;
using Travelcards.Helpers;

var host = new HostBuilder()
    .ConfigureAppConfiguration((context, builder) =>
    {
        builder.AddEnvironmentVariables();
    })
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices((context, services) =>
    {
        var config = context.Configuration;
        var connString = config["PostgresConnectionString"] ?? "Host=localhost;Username=postgres;Password=postgres;Database=travelcards;Pooling=true";

        var npgsqlBuilder = new NpgsqlDataSourceBuilder(connString);
        var dataSource = npgsqlBuilder.Build();

        services.AddSingleton(dataSource);
        services.AddSingleton<DatabaseHelper>();
    })
    .ConfigureLogging((context, b) =>
    {
        b.AddConsole();
    })
    .Build();

host.Run();
