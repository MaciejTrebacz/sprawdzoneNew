﻿using System.ComponentModel.DataAnnotations;

namespace AuctionService.DTOs;

public class UpdateAuctionDto
{
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public int HorsePower { get; set; }
    public int Torque { get; set; }
    public int Displacement { get; set; }
    public string Color { get; set; }
    public int Mileage { get; set; }
}