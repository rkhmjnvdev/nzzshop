const POWER_OVERHEAD_W = 75; // motherboard, fans, drives, USB devices

export function checkBuild(build) {
  const { cpu, motherboard, ram, gpu, psu, case: pcCase } = build;
  const errors = [];
  const warnings = [];

  if (cpu && motherboard && cpu.specs.socket !== motherboard.specs.socket) {
    errors.push(`CPU socket ${cpu.specs.socket} does not match motherboard socket ${motherboard.specs.socket}.`);
  }

  if (ram && motherboard) {
    if (ram.specs.type !== motherboard.specs.ram_type) {
      errors.push(`Motherboard supports ${motherboard.specs.ram_type}, but the RAM is ${ram.specs.type}.`);
    }
    const sticks = parseInt(ram.specs.kit?.split("x")[0] ?? "1", 10);
    if (sticks > motherboard.specs.ram_slots) {
      errors.push(`RAM kit needs ${sticks} slots; motherboard has ${motherboard.specs.ram_slots}.`);
    }
  }

  if (motherboard && pcCase && !pcCase.specs.form_factors.includes(motherboard.specs.form_factor)) {
    errors.push(`Case does not support ${motherboard.specs.form_factor} motherboards.`);
  }

  if (gpu && pcCase && gpu.specs.length_mm > pcCase.specs.max_gpu_length_mm) {
    errors.push(`GPU (${gpu.specs.length_mm} mm) is too long for this case (max ${pcCase.specs.max_gpu_length_mm} mm).`);
  }

  const totalPower = (cpu?.specs.tdp_w ?? 0) + (gpu?.specs.tdp_w ?? 0) + (ram ? 10 : 0) + POWER_OVERHEAD_W;
  const recommendedPsu = Math.ceil((totalPower * 1.25) / 50) * 50;

  if (psu) {
    if (psu.specs.wattage < totalPower) {
      errors.push(`PSU (${psu.specs.wattage} W) cannot supply the estimated ${totalPower} W.`);
    } else if (psu.specs.wattage < recommendedPsu) {
      warnings.push(`PSU is below the recommended ${recommendedPsu} W (25% headroom).`);
    }
  }

  return { valid: errors.length === 0, errors, warnings, totalPower, recommendedPsu };
}

export function isCompatibleWithBuild(candidate, category, build) {
  const { errors } = checkBuild({ ...build, [category]: candidate });
  return errors.length === 0;
}
